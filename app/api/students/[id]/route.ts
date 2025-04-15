import { NextRequest } from "next/server";
import { getStudentFeatures, logPrediction } from "@/lib/oracle-db";
import { predictStudentOutcome, PredictionResult } from "@/lib/ml-model";

// Optional: Add types for the API response
type ApiResponse = {
  studentId: number;
  prediction: PredictionResult;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  const studentIdStr = params.studentId;
  const studentId = parseInt(studentIdStr);

  if (isNaN(studentId)) {
    return new Response(JSON.stringify({ error: "Invalid student ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Get features from Oracle DB
    const features = await getStudentFeatures(studentId);

    // Run the mock ML model
    const prediction = predictStudentOutcome(features);

    // Log prediction result to Oracle
    await logPrediction(studentId, prediction.outcome, prediction.confidence);

    const responseData: ApiResponse = {
      studentId,
      prediction,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Prediction API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}