"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { motion } from "framer-motion"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, TrendingUp, Users } from "lucide-react"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalStudents: 0,
    atRiskCount: 0,
    passingCount: 0,
    improvementRate: 0,
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats({
        totalStudents: 256,
        atRiskCount: 42,
        passingCount: 214,
        improvementRate: 68,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const COLORS = ["#4CAF50", "#8D6E63"]

  const pieData = [
    { name: "Passing", value: stats.passingCount },
    { name: "At Risk", value: stats.atRiskCount },
  ]

  const performanceData = [
    { name: "Math", passing: 78, atRisk: 22 },
    { name: "Science", passing: 82, atRisk: 18 },
    { name: "English", passing: 75, atRisk: 25 },
    { name: "History", passing: 88, atRisk: 12 },
    { name: "Art", passing: 92, atRisk: 8 },
  ]

  const factorsData = [
    { name: "Attendance", value: 85 },
    { name: "Homework", value: 72 },
    { name: "Participation", value: 68 },
    { name: "Test Scores", value: 76 },
    { name: "Projects", value: 81 },
  ]

  return (
    <div className="container mx-auto p-6">
      <motion.h1
        className="text-3xl font-bold text-green-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Student Performance Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-l-4 border-green-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-green-600" />
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.totalStudents}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-l-4 border-brown-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">At Risk Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-brown-600" />
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.atRiskCount}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-l-4 border-green-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Passing Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-600" />
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.passingCount}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-l-4 border-brown-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Improvement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-brown-600" />
                <div className="text-2xl font-bold">{isLoading ? "..." : `${stats.improvementRate}%`}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-green-800 mb-4">Overall Student Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-green-800 mb-4">Performance by Subject</h2>
          <div className="h-64">
            <ChartContainer
              config={{
                passing: {
                  label: "Passing",
                  color: "hsl(var(--chart-1))",
                },
                atRisk: {
                  label: "At Risk",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="passing" stackId="a" fill="var(--color-passing)" />
                  <Bar dataKey="atRisk" stackId="a" fill="var(--color-atRisk)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold text-green-800 mb-4">Key Prediction Factors</h2>
        <div className="h-64">
          <ChartContainer
            config={{
              value: {
                label: "Impact Score",
                color: "hsl(var(--chart-3))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={factorsData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" barSize={20} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Tabs defaultValue="recent">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent Predictions</TabsTrigger>
            <TabsTrigger value="improved">Most Improved</TabsTrigger>
            <TabsTrigger value="risk">Highest Risk</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Recently Analyzed Students</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50">
                    <th className="px-4 py-2 text-left text-brown-700">Student ID</th>
                    <th className="px-4 py-2 text-left text-brown-700">Name</th>
                    <th className="px-4 py-2 text-left text-brown-700">Grade</th>
                    <th className="px-4 py-2 text-left text-brown-700">Prediction</th>
                    <th className="px-4 py-2 text-left text-brown-700">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Emma Johnson</td>
                    <td className="px-4 py-2">10th</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Pass</span>
                    </td>
                    <td className="px-4 py-2">92%</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">James Smith</td>
                    <td className="px-4 py-2">9th</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-brown-100 text-brown-800 rounded">At Risk</span>
                    </td>
                    <td className="px-4 py-2">78%</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">Sophia Williams</td>
                    <td className="px-4 py-2">11th</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Pass</span>
                    </td>
                    <td className="px-4 py-2">88%</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">4</td>
                    <td className="px-4 py-2">Liam Brown</td>
                    <td className="px-4 py-2">10th</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Pass</span>
                    </td>
                    <td className="px-4 py-2">85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="improved" className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Most Improved Students</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50">
                    <th className="px-4 py-2 text-left text-brown-700">Student ID</th>
                    <th className="px-4 py-2 text-left text-brown-700">Name</th>
                    <th className="px-4 py-2 text-left text-brown-700">Grade</th>
                    <th className="px-4 py-2 text-left text-brown-700">Improvement</th>
                    <th className="px-4 py-2 text-left text-brown-700">Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">5</td>
                    <td className="px-4 py-2">Noah Garcia</td>
                    <td className="px-4 py-2">9th</td>
                    <td className="px-4 py-2">+28%</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Pass</span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">6</td>
                    <td className="px-4 py-2">Olivia Martinez</td>
                    <td className="px-4 py-2">10th</td>
                    <td className="px-4 py-2">+24%</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Pass</span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">7</td>
                    <td className="px-4 py-2">Ethan Davis</td>
                    <td className="px-4 py-2">11th</td>
                    <td className="px-4 py-2">+22%</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Pass</span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">8</td>
                    <td className="px-4 py-2">Ava Rodriguez</td>
                    <td className="px-4 py-2">9th</td>
                    <td className="px-4 py-2">+19%</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-brown-100 text-brown-800 rounded">At Risk</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="risk" className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Highest Risk Students</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-50">
                    <th className="px-4 py-2 text-left text-brown-700">Student ID</th>
                    <th className="px-4 py-2 text-left text-brown-700">Name</th>
                    <th className="px-4 py-2 text-left text-brown-700">Grade</th>
                    <th className="px-4 py-2 text-left text-brown-700">Risk Score</th>
                    <th className="px-4 py-2 text-left text-brown-700">Primary Factor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">9</td>
                    <td className="px-4 py-2">Mason Wilson</td>
                    <td className="px-4 py-2">10th</td>
                    <td className="px-4 py-2">89%</td>
                    <td className="px-4 py-2">Attendance</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">10</td>
                    <td className="px-4 py-2">Isabella Moore</td>
                    <td className="px-4 py-2">9th</td>
                    <td className="px-4 py-2">82%</td>
                    <td className="px-4 py-2">Test Scores</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">11</td>
                    <td className="px-4 py-2">Lucas Taylor</td>
                    <td className="px-4 py-2">11th</td>
                    <td className="px-4 py-2">78%</td>
                    <td className="px-4 py-2">Homework</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">James Smith</td>
                    <td className="px-4 py-2">9th</td>
                    <td className="px-4 py-2">76%</td>
                    <td className="px-4 py-2">Participation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
