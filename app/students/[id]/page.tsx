"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Edit, AlertTriangle, CheckCircle, BookOpen, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function StudentDetail() {
  const params = useParams()
  const router = useRouter()
  const [student, setStudent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch student data
    const timer = setTimeout(() => {
      // Mock student data
      const mockStudent = {
        id: params.id,
        name: "Emma Johnson",
        grade: "10th",
        status: "pass",
        prediction: {
          result: "pass",
          confidence: 92,
          factors: [
            { name: "Attendance", score: 95, impact: "high", trend: "stable" },
            { name: "Homework Completion", score: 88, impact: "medium", trend: "improving" },
            { name: "Test Scores", score: 82, impact: "high", trend: "improving" },
            { name: "Class Participation", score: 78, impact: "medium", trend: "stable" },
            { name: "Project Quality", score: 90, impact: "medium", trend: "improving" },
          ],
        },
        academics: {
          gpa: 3.8,
          attendance: 95,
          subjects: [
            { name: "Math", grade: "A", status: "strong" },
            { name: "Science", grade: "B+", status: "strong" },
            { name: "English", grade: "A-", status: "strong" },
            { name: "History", grade: "B", status: "good" },
            { name: "Art", grade: "A", status: "strong" },
          ],
          recentAssignments: [
            { name: "Math Quiz 3", score: 92, date: "2025-03-10", status: "completed" },
            { name: "Science Lab Report", score: 88, date: "2025-03-08", status: "completed" },
            { name: "English Essay", score: 95, date: "2025-03-12", status: "completed" },
            { name: "History Presentation", score: null, date: "2025-03-18", status: "upcoming" },
          ],
        },
        trends: {
          attendance: [
            { month: "Sep", value: 98 },
            { month: "Oct", value: 96 },
            { month: "Nov", value: 92 },
            { month: "Dec", value: 90 },
            { month: "Jan", value: 94 },
            { month: "Feb", value: 95 },
            { month: "Mar", value: 95 },
          ],
          grades: [
            { month: "Sep", value: 88 },
            { month: "Oct", value: 85 },
            { month: "Nov", value: 82 },
            { month: "Dec", value: 80 },
            { month: "Jan", value: 84 },
            { month: "Feb", value: 86 },
            { month: "Mar", value: 88 },
          ],
          participation: [
            { month: "Sep", value: 75 },
            { month: "Oct", value: 72 },
            { month: "Nov", value: 70 },
            { month: "Dec", value: 68 },
            { month: "Jan", value: 72 },
            { month: "Feb", value: 76 },
            { month: "Mar", value: 78 },
          ],
        },
        interventions: [
          { type: "Extra Help Session", date: "2025-02-15", status: "completed", notes: "Focused on algebra concepts" },
          {
            type: "Parent Conference",
            date: "2025-02-20",
            status: "completed",
            notes: "Discussed improvement strategies",
          },
          { type: "Study Group Assignment", date: "2025-03-01", status: "active", notes: "Paired with peer mentors" },
          {
            type: "Weekly Progress Check",
            date: "2025-03-22",
            status: "scheduled",
            notes: "Will review recent test scores",
          },
        ],
        academics: {
          gpa: 3.8,
          attendance: 95,
          averageGrade: 85, // Added averageGrade
          subjects: [
            { name: "Math", grade: "A", status: "strong" },
            { name: "Science", grade: "B+", status: "strong" },
            { name: "English", grade: "A-", status: "strong" },
            { name: "History", grade: "B", status: "good" },
            { name: "Art", grade: "A", status: "strong" },
          ],
          recentAssignments: [
            { name: "Math Quiz 3", score: 92, date: "2025-03-10", status: "completed" },
            { name: "Science Lab Report", score: 88, date: "2025-03-08", status: "completed" },
            { name: "English Essay", score: 95, date: "2025-03-12", status: "completed" },
            { name: "History Presentation", score: null, date: "2025-03-18", status: "upcoming" },
          ],
        },
      }

      setStudent(mockStudent)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <AlertTriangle className="h-12 w-12 text-brown-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-brown-800 mb-2">Student Not Found</h2>
          <p className="text-brown-600 mb-6">The student you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link href="/students">Back to Students</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4 md:mb-0">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/students">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-green-800">{student.name}</h1>
            <p className="text-muted-foreground">
              {student.id} • {student.grade} Grade
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
          <Button className="bg-green-700 hover:bg-green-800">Run New Prediction</Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-green-800">Prediction Results</CardTitle>
              <CardDescription>Latest analysis based on academic and behavioral data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  {student.prediction.result === "pass" ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-brown-600 mr-3" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {student.prediction.result === "pass" ? "Predicted to Pass" : "At Risk of Failing"}
                    </h3>
                    <p className="text-muted-foreground">
                      {student.prediction.confidence}% confidence in this prediction
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    student.prediction.result === "pass" ? "bg-green-100 text-green-800" : "bg-brown-100 text-brown-800"
                  }
                >
                  {student.prediction.result === "pass" ? "Low Risk" : "High Risk"}
                </Badge>
              </div>

              <h3 className="font-semibold mb-3">Key Factors</h3>
              <div className="space-y-4">
                {student.prediction.factors.map((factor, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium">{factor.name}</span>
                        {factor.impact === "high" && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            High Impact
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm">{factor.score}%</span>
                    </div>
                    <div className="flex items-center">
                      <Progress value={factor.score} className="h-2 flex-grow" />
                      <span className="ml-2 text-xs text-muted-foreground">
                        {factor.trend === "improving" ? "↑" : factor.trend === "declining" ? "↓" : "→"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-green-800">Academic Summary</CardTitle>
              <CardDescription>Current performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="h-5 w-5 text-green-700 mr-2" />
                    <span className="text-sm font-medium">Average Grade</span>
                  </div>
                  <p className="text-2xl font-bold text-center text-green-800">
                    {student.academics.averageGrade.toFixed(1)}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-green-700 mr-2" />
                    <span className="text-sm font-medium">Attendance</span>
                  </div>
                  <p className="text-2xl font-bold text-center text-green-800">{student.academics.attendance}%</p>
                </div>
              </div>

              <h3 className="font-semibold mb-3">Subject Performance</h3>
              <div className="space-y-2">
                {student.academics.subjects.map((subject, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-green-50 rounded-md">
                    <span>{subject.name}</span>
                    <div className="flex items-center">
                      <span
                        className={`font-semibold ${
                          subject.status === "strong"
                            ? "text-green-600"
                            : subject.status === "good"
                              ? "text-green-500"
                              : subject.status === "fair"
                                ? "text-brown-500"
                                : "text-brown-600"
                        }`}
                      >
                        {subject.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tabs defaultValue="trends">
          <TabsList className="mb-4">
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
            <TabsTrigger value="assignments">Recent Assignments</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Performance Over Time</h3>
            <div className="h-80">
              <ChartContainer
                config={{
                  attendance: {
                    label: "Attendance",
                    color: "hsl(var(--chart-1))",
                  },
                  grades: {
                    label: "Grades",
                    color: "hsl(var(--chart-2))",
                  },
                  participation: {
                    label: "Participation",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={student.trends.attendance.map((item, i) => ({
                      month: item.month,
                      attendance: item.value,
                      grades: student.trends.grades[i].value,
                      participation: student.trends.participation[i].value,
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="var(--color-attendance)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="grades"
                      stroke="var(--color-grades)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="participation"
                      stroke="var(--color-participation)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Recent & Upcoming Assignments</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50">
                    <th className="px-4 py-2 text-left text-brown-700">Assignment</th>
                    <th className="px-4 py-2 text-left text-brown-700">Date</th>
                    <th className="px-4 py-2 text-left text-brown-700">Status</th>
                    <th className="px-4 py-2 text-left text-brown-700">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {student.academics.recentAssignments.map((assignment, index) => (
                    <tr key={index} className="border-b hover:bg-green-50">
                      <td className="px-4 py-3">{assignment.name}</td>
                      <td className="px-4 py-3">{new Date(assignment.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <Badge variant={assignment.status === "completed" ? "default" : "outline"}>
                          {assignment.status === "completed" ? "Completed" : "Upcoming"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{assignment.score !== null ? `${assignment.score}%` : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="interventions" className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-800">Intervention History</h3>
              <Button size="sm" className="bg-green-700 hover:bg-green-800">
                Add Intervention
              </Button>
            </div>
            <div className="space-y-4">
              {student.interventions.map((intervention, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <div className="flex items-center mb-2 md:mb-0">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(intervention.date).toLocaleDateString()}
                        </span>
                      </div>
                      <Badge
                        variant={
                          intervention.status === "completed"
                            ? "default"
                            : intervention.status === "active"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {intervention.status}
                      </Badge>
                    </div>
                    <h4 className="font-semibold">{intervention.type}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{intervention.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
