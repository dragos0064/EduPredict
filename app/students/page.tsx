"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  useEffect(() => {
    // Simulate fetching data from API
    const timer = setTimeout(() => {
      const mockStudents = [
        {
          id: "ST-1001",
          name: "Emma Johnson",
          grade: "9th",
          status: "pass",
          attendance: 95,
          averageGrade: 3.8,
          lastUpdated: "2025-03-15",
        },
        {
          id: "ST-1002",
          name: "James Smith",
          grade: "10th",
          status: "at-risk",
          attendance: 78,
          averageGrade: 2.3,
          lastUpdated: "2025-03-14",
        },
        {
          id: "ST-1003",
          name: "Sophia Williams",
          grade: "11th",
          status: "pass",
          attendance: 92,
          averageGrade: 3.6,
          lastUpdated: "2025-03-16",
        },
        {
          id: "ST-1004",
          name: "Liam Brown",
          grade: "9th",
          status: "pass",
          attendance: 88,
          averageGrade: 3.2,
          lastUpdated: "2025-03-12",
        },
        {
          id: "ST-1005",
          name: "Olivia Martinez",
          grade: "10th",
          status: "pass",
          attendance: 91,
          averageGrade: 3.5,
          lastUpdated: "2025-03-15",
        },
        {
          id: "ST-1006",
          name: "Noah Garcia",
          grade: "9th",
          status: "at-risk",
          attendance: 72,
          averageGrade: 2.1,
          lastUpdated: "2025-03-13",
        },
        {
          id: "ST-1007",
          name: "Ava Rodriguez",
          grade: "11th",
          status: "pass",
          attendance: 94,
          averageGrade: 3.9,
          lastUpdated: "2025-03-16",
        },
        {
          id: "ST-1008",
          name: "Ethan Davis",
          grade: "10th",
          status: "at-risk",
          attendance: 75,
          averageGrade: 2.4,
          lastUpdated: "2025-03-14",
        },
        {
          id: "ST-1009",
          name: "Isabella Moore",
          grade: "9th",
          status: "pass",
          attendance: 89,
          averageGrade: 3.3,
          lastUpdated: "2025-03-15",
        },
        {
          id: "ST-1010",
          name: "Mason Wilson",
          grade: "11th",
          status: "at-risk",
          attendance: 68,
          averageGrade: 2.0,
          lastUpdated: "2025-03-13",
        },
      ]
      setStudents(mockStudents)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("asc")
    }
  }

  const filteredStudents = students
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((student) => gradeFilter === "all" || student.grade === gradeFilter)
    .filter((student) => statusFilter === "all" || student.status === statusFilter)
    .sort((a, b) => {
      let comparison = 0

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "grade") {
        comparison = a.grade.localeCompare(b.grade)
      } else if (sortBy === "attendance") {
        comparison = a.attendance - b.attendance
      } else if (sortBy === "gpa") {
        comparison = a.gpa - b.gpa
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <motion.h1
          className="text-3xl font-bold text-green-800 mb-4 md:mb-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Student Management
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/students/new">
            <Button className="bg-green-700 hover:bg-green-800">
              <Plus className="mr-2 h-4 w-4" /> Add New Student
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9th">9th Grade</SelectItem>
                <SelectItem value="10th">10th Grade</SelectItem>
                <SelectItem value="11th">11th Grade</SelectItem>
                <SelectItem value="12th">12th Grade</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pass">Passing</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStudents.map((student) => (
            <motion.div key={student.id} variants={item}>
              <Link href={`/students/${student.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-600">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {student.id}</p>
                      </div>
                      <Badge variant={student.status === "pass" ? "default" : "destructive"}>
                        {student.status === "pass" ? "Passing" : "At Risk"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <p className="font-medium">{student.grade}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Attendance</p>
                        <p className="font-medium">{student.attendance}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Average Grade</p>
                        <p className="font-medium">{student.averageGrade.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p className="font-medium">{new Date(student.lastUpdated).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!isLoading && filteredStudents.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg text-brown-700">No students found matching your filters.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("")
              setGradeFilter("all")
              setStatusFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
