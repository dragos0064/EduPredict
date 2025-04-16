"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Student = {
  ID: number;
  NAME: string;
  GRADE: string;
  AVERAGE_GRADE: number;
  ATTENDANCE: number;
  PREVIOUS_PERFORMANCE: string;
  EMAIL: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to load students.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    let results = students;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (s) =>
          s.NAME.toLowerCase().includes(term) ||
          s.ID.toString().includes(term)
      );
    }

    if (gradeFilter !== "all") {
      results = results.filter((s) => s.GRADE === gradeFilter);
    }

    setFiltered(results);
  }, [searchTerm, gradeFilter, students]);

  const getStatus = (student: Student) => {
    return student.AVERAGE_GRADE >= 5 && student.ATTENDANCE >= 75
      ? "pass"
      : "at-risk";
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

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

      {/* Search Bar */}
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
          {filtered.map((student) => {
            const status = getStatus(student);
            return (
              <Link href={`/students/${student.ID}`} key={student.ID}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-600">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">{student.NAME}</h3>
                        <p className="text-sm text-muted-foreground">ID: {student.ID}</p>
                      </div>
                      <Badge variant={status === "pass" ? "default" : "destructive"}>
                        {status === "pass" ? "Passing" : "At Risk"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <p className="font-medium">{student.GRADE}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Attendance</p>
                        <p className="font-medium">{student.ATTENDANCE}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Average Grade</p>
                        <p className="font-medium">{student.AVERAGE_GRADE.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Performance</p>
                        <p className="font-medium">{student.PREVIOUS_PERFORMANCE}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </motion.div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg text-brown-700">No students found matching your filters.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setGradeFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
