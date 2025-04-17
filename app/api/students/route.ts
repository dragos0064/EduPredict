// app/api/students/route.ts

import { NextRequest } from "next/server";
import { getConnection } from "@/lib/oracle-db";
import oracledb from "oracledb";
import { spawn } from "child_process";
import path from "path";

// ─── GET all students ─────────────────────────────────────────────────────────
export async function GET() {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT 
         ID,
         NAME,
         GRADE,
         AVERAGE_GRADE,
         ATTENDANCE,
         PREVIOUS_PERFORMANCE,
         EMAIL
       FROM STUDENTS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await conn.close();

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch students" }),
      { status: 500 }
    );
  }
}

// ─── POST add student + kick off ML prediction ────────────────────────────────
export async function POST(req: NextRequest) {
  let conn: oracledb.Connection | undefined;

  try {
    // 1) Parse incoming JSON
    const {
      name,
      grade,
      averageGrade,
      attendance,
      previousPerformance,
      email,
    } = await req.json();

    // 2) Insert into STUDENTS and get the new ID
    conn = await getConnection();
    const insertRes = await conn.execute(
      `
      INSERT INTO STUDENTS 
        (NAME, GRADE, AVERAGE_GRADE, ATTENDANCE, PREVIOUS_PERFORMANCE, EMAIL)
      VALUES 
        (:name, :grade, :avg, :att, :perf, :email)
      RETURNING ID INTO :newId
      `,
      {
        name,
        grade,
        avg: averageGrade,
        att: attendance,
        perf: previousPerformance,
        email,
        newId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      },
      { autoCommit: false }
    );

    // Extract the generated student ID
    const binds = insertRes.outBinds as { newId: number[] };
    const studentId = binds.newId[0];
    await conn.commit();

    // 3) Immediately respond to client
    const resp = new Response(
      JSON.stringify({ message: "Student added", studentId }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );

    // 4) Fire‑and‑forget ML + PREDICTIONS logic
    (async () => {
      try {
        // a) Launch Python
        const script = path.resolve(process.cwd(), "predict.py");
        const py = spawn("python", [script], { stdio: ["pipe", "pipe", "pipe"] });

        // b) Send features via stdin
        py.stdin.write(
          JSON.stringify({
            attendance,
            average_grade: averageGrade,
            previous_performance: previousPerformance,
          })
        );
        py.stdin.end();

        // c) Collect stdout and stderr
        let out = "";
        let err = "";
        py.stdout.on("data", (chunk) => (out += chunk.toString()));
        py.stderr.on("data", (chunk) => (err += chunk.toString()));

        // d) Wait for Python to finish
        await new Promise<void>((resolve) => py.on("close", () => resolve()));

        if (err) {
          console.error("Python stderr:", err);
          return;
        }
        if (!out.trim()) {
          console.error("No JSON from predict.py");
          return;
        }

        // e) Parse JSON result
        let resultObj;
        try {
          resultObj = JSON.parse(out);
        } catch (parseErr) {
          console.error("Invalid JSON from predict.py:", out);
          return;
        }

        const { result, confidence } = resultObj;

        // f) Insert into PREDICTIONS (ID & PREDICTION_DATE defaulted)
        await conn!.execute(
          `
          INSERT INTO PREDICTIONS
            (PREDICTED_RESULT, CONFIDENCE)
          VALUES
            (:res, :conf)
          `,
          { res: result, conf: confidence },
          { autoCommit: true }
        );
      } catch (mlErr) {
        console.error("ML / PREDICTIONS error:", mlErr);
      }
    })();

    return resp;
  } catch (err: unknown) {
    console.error("POST /api/students error:", err);
    // Roll back if we opened a connection
    if (conn) {
      try {
        await conn.rollback();
        await conn.close();
      } catch {}
    }
    return new Response(
      JSON.stringify({ error: "Failed to add student", details: `${err}` }),
      { status: 500 }
    );
  }
}
