import { getConnection } from "@/lib/oracle-db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const studentId = parseInt(params.id);

  if (isNaN(studentId)) {
    return new Response(JSON.stringify({ error: "Invalid student ID" }), { status: 400 });
  }

  try {
    const conn = await getConnection();

    const result = await conn.execute(
      `SELECT ID, FIRST_NAME, LAST_NAME, GRADE, AVERAGE_GRADE, ATTENDANCE, PREVIOUS_PERFORMANCE, EMAIL 
       FROM STUDENTS 
       WHERE ID = :id`,
      [studentId],
      { outFormat: 4001 } // OBJECT
    );

    await conn.close();

    if (!result.rows || result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/students/[id] error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
