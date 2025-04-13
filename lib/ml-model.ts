// This file simulates a machine learning model for student performance prediction
// In a real application, this would connect to a TensorFlow.js model or an API

export interface StudentData {
  attendance: number
  homeworkCompletion: number
  testScores: number
  participation: number
  previousGrades: number // Now on a 1-10 scale
}

export interface PredictionResult {
  outcome: "pass" | "fail"
  confidence: number
  riskFactors: {
    name: string
    impact: "high" | "medium" | "low"
    value: number
  }[]
  recommendations: string[]
}

// Simulated weights for our prediction model
const MODEL_WEIGHTS = {
  attendance: 0.35,
  homeworkCompletion: 0.2,
  testScores: 0.25,
  participation: 0.1,
  previousGrades: 0.1,
}

export function predictStudentOutcome(data: StudentData): PredictionResult {
  // Calculate weighted score
  let weightedScore =
    data.attendance * MODEL_WEIGHTS.attendance +
    data.homeworkCompletion * MODEL_WEIGHTS.homeworkCompletion +
    data.testScores * MODEL_WEIGHTS.testScores +
    data.participation * MODEL_WEIGHTS.participation +
    // Convert the 1-10 scale to a percentage for consistency in the model
    ((data.previousGrades - 1) / 9) * 100 * MODEL_WEIGHTS.previousGrades

  // Normalize to 0-100 scale
  weightedScore = Math.min(100, Math.max(0, weightedScore))

  // Determine outcome and confidence
  const outcome = weightedScore >= 70 ? "pass" : "fail"
  const confidence =
    outcome === "pass" ? Math.round((weightedScore - 70) * (100 / 30)) : Math.round((70 - weightedScore) * (100 / 70))

  // Identify risk factors
  const riskFactors = [
    {
      name: "Attendance",
      impact: determineImpact(data.attendance, MODEL_WEIGHTS.attendance),
      value: data.attendance,
    },
    {
      name: "Homework Completion",
      impact: determineImpact(data.homeworkCompletion, MODEL_WEIGHTS.homeworkCompletion),
      value: data.homeworkCompletion,
    },
    {
      name: "Test Scores",
      impact: determineImpact(data.testScores, MODEL_WEIGHTS.testScores),
      value: data.testScores,
    },
    {
      name: "Class Participation",
      impact: determineImpact(data.participation, MODEL_WEIGHTS.participation),
      value: data.participation,
    },
    {
      name: "Previous Grades",
      // Convert the 1-10 scale to a percentage for the impact determination
      impact: determineImpact(((data.previousGrades - 1) / 9) * 100, MODEL_WEIGHTS.previousGrades),
      value: data.previousGrades,
    },
  ].sort((a, b) => {
    // Sort by impact (high to low) and then by value (low to high for risk factors)
    const impactOrder = { high: 3, medium: 2, low: 1 }
    if (impactOrder[a.impact as keyof typeof impactOrder] !== impactOrder[b.impact as keyof typeof impactOrder]) {
      return impactOrder[b.impact as keyof typeof impactOrder] - impactOrder[a.impact as keyof typeof impactOrder]
    }
    return a.value - b.value
  })

  // Generate recommendations based on risk factors
  const recommendations = generateRecommendations(riskFactors, outcome)

  return {
    outcome,
    confidence,
    riskFactors: riskFactors as {
      name: string
      impact: "high" | "medium" | "low"
      value: number
    }[],
    recommendations,
  }
}

function determineImpact(value: number, weight: number): "high" | "medium" | "low" {
  if (value < 60 && weight >= 0.25) return "high"
  if (value < 70 && weight >= 0.15) return "medium"
  if (value < 80) return "low"
  return "low"
}

function generateRecommendations(
  riskFactors: { name: string; impact: "high" | "medium" | "low"; value: number }[],
  outcome: "pass" | "fail",
): string[] {
  const recommendations: string[] = []

  if (outcome === "fail") {
    // Add general recommendation for failing students
    recommendations.push("Schedule a parent-teacher conference to discuss improvement strategies.")
  }

  // Add specific recommendations based on risk factors
  riskFactors.forEach((factor) => {
    if (factor.impact === "high" || factor.impact === "medium") {
      switch (factor.name) {
        case "Attendance":
          recommendations.push("Implement daily attendance tracking and follow-up for absences.")
          break
        case "Homework Completion":
          recommendations.push("Assign a homework buddy or provide after-school homework help sessions.")
          break
        case "Test Scores":
          recommendations.push("Provide additional study materials and consider test-taking strategy sessions.")
          break
        case "Class Participation":
          recommendations.push("Create more opportunities for structured participation in class discussions.")
          break
        case "Previous Grades":
          recommendations.push("Review fundamental concepts from previous courses that may be causing difficulties.")
          break
      }
    }
  })

  return recommendations
}
