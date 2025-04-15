import { NextRequest } from "next/server";
import { getConnection } from "@/lib/oracle-db";
import oracledb from "oracledb";

export async function GET() {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT ID, NAME, GRADE, AVERAGE_GRADE, ATTENDANCE, PREVIOUS_PERFORMANCE, EMAIL FROM STUDENTS`
    );

    await conn.close();

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch students" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, grade, averageGrade, attendance, previousPerformance, email } = body;

    const conn = await getConnection();

    await conn.execute(
      `INSERT INTO STUDENTS (NAME, GRADE, AVERAGE_GRADE, ATTENDANCE, PREVIOUS_PERFORMANCE, EMAIL)
       VALUES (:name, :grade, :averageGrade, :attendance, :previousPerformance, :email)`,
      { name, grade, averageGrade, attendance, previousPerformance, email },
      { autoCommit: true }
    );

    await conn.close();

    return new Response(JSON.stringify({ message: "Student added successfully" }), {
      status: 201,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error adding student:", error);
    return new Response(
      JSON.stringify({ error: "Insert failed", details: message }),
      { status: 500 }
    );
  }
}