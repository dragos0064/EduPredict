import { NextRequest } from "next/server";
import { getConnection } from "@/lib/oracle-db";

export async function GET(req: NextRequest) {
  try {
    const conn = await getConnection();

    // Get total number of students
    const totalStudents = await conn.execute(`SELECT COUNT(*) AS COUNT FROM students`);
    const totalCountRow = totalStudents.rows?.[0] as any;

    // Get grouped prediction results
    const totalPredictions = await conn.execute(
      `SELECT predicted_result, COUNT(*) AS COUNT FROM predictions GROUP BY predicted_result`
    );
    const predictionRows = totalPredictions.rows as any[];

    await conn.close();

    // Build response object
    const stats = {
      totalStudents: totalCountRow?.["COUNT"] || 0,
      passingCount: 0,
      atRiskCount: 0,
      improvementRate: Math.floor(Math.random() * 20) + 60,
    };

    predictionRows?.forEach((row) => {
      if (row["PREDICTED_RESULT"] === "pass") stats.passingCount = row["COUNT"];
      if (row["PREDICTED_RESULT"] === "fail") stats.atRiskCount = row["COUNT"];
    });

    // Add a mock improvement rate (can be replaced later)
    stats["improvementRate"] = Math.floor(Math.random() * 20) + 60;

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("/api/stats error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch stats." }), {
      status: 500,
    });
  }
}