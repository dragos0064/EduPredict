"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, Edit, BookOpen, Clock, AlertTriangle, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

export default function StudentDetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/${id}`);
        const data = await res.json();
        setStudent(data);
      } catch (error) {
        console.error("Failed to load student data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container mx-auto p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-brown-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-brown-800 mb-2">Student Not Found</h2>
        <p className="text-brown-600 mb-6">The student you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link href="/students">Back to Students</Link>
        </Button>
      </div>
    );
  }

  const prediction = student.prediction || {};
  const academics = student.academics || {};
  const fullName = `${student.firstName} ${student.lastName}`;

  return (
    <div className="container mx-auto p-6">
      <motion.div className="flex justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/students">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-green-800">{fullName}</h1>
            <p className="text-muted-foreground">{student.ID} • {student.GRADE} Grade</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/students/${student.ID}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </Link>
          <Button className="bg-green-700 hover:bg-green-800">Run New Prediction</Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Prediction Results */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">Prediction Results</CardTitle>
            <CardDescription>Latest analysis based on academic and behavioral data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                {prediction.outcome === "pass" ? (
                  <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-brown-600 mr-3" />
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {prediction.outcome === "pass" ? "Predicted to Pass" : "At Risk of Failing"}
                  </h3>
                  <p className="text-muted-foreground">
                    {prediction.confidence || 0}% confidence in this prediction
                  </p>
                </div>
              </div>
              <Badge className={prediction.outcome === "pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {prediction.outcome === "pass" ? "Low Risk" : "High Risk"}
              </Badge>
            </div>

            <h3 className="font-semibold mb-3">Key Factors</h3>
            <div className="space-y-3">
              {prediction.factors?.map((factor: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{factor.name}</span>
                    <span>{factor.score}%</span>
                  </div>
                  <Progress value={factor.score} />
                </div>
              )) || <p>No factor data.</p>}
            </div>
          </CardContent>
        </Card>

        {/* Academic Summary */}
        <Card>
          <CardHeader>
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
                <p className="text-2xl font-bold text-center text-green-800">{academics.averageGrade}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-green-700 mr-2" />
                  <span className="text-sm font-medium">Attendance</span>
                </div>
                <p className="text-2xl font-bold text-center text-green-800">{academics.attendance}%</p>
              </div>
            </div>
            <h3 className="font-semibold mb-3">Subject Performance</h3>
            <div className="space-y-2">
              {academics.subjects?.map((sub: any, i: number) => (
                <div key={i} className="flex justify-between">
                  <span>{sub.name}</span>
                  <span className="font-semibold">{sub.grade}</span>
                </div>
              )) || <p>No subjects available.</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* You can extend this with Trends, Assignments, and Interventions Tabs later */}
    </div>
  );
}
