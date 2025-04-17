import { NextRequest } from "next/server";
import { getConnection } from "@/lib/oracle-db";
import oracledb from "oracledb";

export async function GET(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  const sid = parseInt(params.studentId, 10);
  if (isNaN(sid)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT PREDICTED_RESULT, CONFIDENCE, PREDICTION_DATE
         FROM PREDICTIONS
        WHERE ID = :sid
        ORDER BY PREDICTION_DATE DESC
      `,
      [sid],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return new Response(JSON.stringify(result.rows?.[0] || null), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error fetching prediction:", e);
    return new Response(JSON.stringify({ error: "DB error" }), { status: 500 });
  } finally {
    await conn.close();
  }
}