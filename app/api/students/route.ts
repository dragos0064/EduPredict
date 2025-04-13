import { type NextRequest, NextResponse } from "next/server"

// In a real application, this would connect to an Oracle Database
// For this example, we'll simulate database operations

// Mock student data
const students = [
  {
    id: "1",
    name: "Emma Johnson",
    grade: "9th",
    status: "pass",
    attendance: 95,
    averageGrade: 9.2,
    lastUpdated: "2025-03-15",
  },
  {
    id: "2",
    name: "James Smith",
    grade: "10th",
    status: "at-risk",
    attendance: 78,
    averageGrade: 5.6,
    lastUpdated: "2025-03-14",
  },
  {
    id: "3",
    name: "Sophia Williams",
    grade: "11th",
    status: "pass",
    attendance: 92,
    averageGrade: 8.7,
    lastUpdated: "2025-03-16",
  },
  // More students would be here in a real application
]

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")?.toLowerCase()
    const grade = searchParams.get("grade")
    const status = searchParams.get("status")

    // Filter students based on query parameters
    let filteredStudents = [...students]

    if (search) {
      filteredStudents = filteredStudents.filter(
        (student) => student.name.toLowerCase().includes(search) || student.id.toLowerCase().includes(search),
      )
    }

    if (grade && grade !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.grade === grade)
    }

    if (status && status !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.status === status)
    }

    return NextResponse.json({
      success: true,
      students: filteredStudents,
    })
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.grade) {
      return NextResponse.json({ error: "Name and grade are required" }, { status: 400 })
    }

    // Generate a new student ID
    const newId = `${students.length + 1}`

    // Create new student object
    const newStudent = {
      id: newId,
      name: data.name,
      grade: data.grade,
      status: "pass", // Default status
      attendance: data.attendance || 100,
      averageGrade: data.averageGrade || 1,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    // Add to our mock database
    students.push(newStudent)

    return NextResponse.json({
      success: true,
      student: newStudent,
    })
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}
