"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Student = {
  ID: number;
  NAME: string;
  EMAIL: string;
  CLASS: string;
  ENROLLMENT_DATE: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
    
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
    
        const data = await res.json();
        setStudents(data);
        setFiltered(data); // if you're using filtered results
      } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to load students. Check the server.");
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  // Filters based on your controls
  useEffect(() => {
    let result = students;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.NAME.toLowerCase().includes(term) ||
          s.ID.toString().includes(term)
      );
    }

    if (gradeFilter !== "all") {
      result = result.filter((s) => s.CLASS === gradeFilter);
    }

    // Optional: implement real status filter if your DB returns status

    setFiltered(result);
  }, [searchTerm, gradeFilter, statusFilter, students]);

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

      {/* Search and Filters */}
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

          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="9A">9A</SelectItem>
              <SelectItem value="10A">10A</SelectItem>
              <SelectItem value="11B">11B</SelectItem>
              <SelectItem value="12C">12C</SelectItem>
              {/* Add more as needed */}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Students Grid */}
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
          {filtered.map((student) => (
            <motion.div key={student.ID} variants={item}>
              <Link href={`/students/${student.ID}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-600">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">{student.NAME}</h3>
                        <p className="text-sm text-muted-foreground">ID: {student.ID}</p>
                      </div>
                      <Badge variant="default">Enrolled</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Class</p>
                        <p className="font-medium">{student.CLASS}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Enrollment Date</p>
                        <p className="font-medium">
                          {new Date(student.ENROLLMENT_DATE).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
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
              setStatusFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
