import { type NextRequest, NextResponse } from "next/server"
import { predictStudentOutcome, type StudentData } from "@/lib/ml-model"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate input data
    if (!isValidStudentData(data)) {
      return NextResponse.json({ error: "Invalid student data provided" }, { status: 400 })
    }

    // Process the prediction
    const prediction = predictStudentOutcome(data)

    // In a real application, we would save the prediction to the database here
    // await saveToDatabase(data.studentId, prediction);

    return NextResponse.json({
      success: true,
      prediction,
    })
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Failed to process prediction" }, { status: 500 })
  }
}

function isValidStudentData(data: any): data is StudentData {
  return (
    typeof data === "object" &&
    typeof data.attendance === "number" &&
    typeof data.homeworkCompletion === "number" &&
    typeof data.testScores === "number" &&
    typeof data.participation === "number" &&
    typeof data.previousGrades === "number" &&
    data.attendance >= 0 &&
    data.attendance <= 100 &&
    data.homeworkCompletion >= 0 &&
    data.homeworkCompletion <= 100 &&
    data.testScores >= 0 &&
    data.testScores <= 100 &&
    data.participation >= 0 &&
    data.participation <= 100 &&
    data.previousGrades >= 0 &&
    data.previousGrades <= 100
  )
}
