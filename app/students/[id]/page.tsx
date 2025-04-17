"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Edit,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Clock,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

type Student = {
  id: number;
  name: string;
  grade: string;
  prediction: {
    result: "pass" | "fail";
    confidence: number;
    factors: {
      name: string;
      score: number;
      impact: "high" | "medium" | "low";
      trend: "improving" | "declining" | "stable";
    }[];
  };
  academics: {
    averageGrade: number;
    attendance: number;
    subjects: { name: string; grade: string; status: string }[];
    recentAssignments: { name: string; score: number | null; date: string; status: string }[];
  };
  trends: {
    attendance: { month: string; value: number }[];
    grades: { month: string; value: number }[];
    participation: { month: string; value: number }[];
  };
  interventions: { type: string; date: string; status: string; notes: string }[];
};

export default function StudentDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [prediction, setPrediction] = useState<{
    predicted_result: "pass" | "fail";
    confidence: number;
    prediction_date: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPredLoading, setIsPredLoading] = useState(true);

  // 1) Fetch student details (with pre-populated mock ML results)
  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`/api/students/${params.id}`);
        if (!res.ok) throw new Error("Failed to load student");
        const data: Student = await res.json();
        setStudent(data);
      } catch (e) {
        console.error(e);
        router.push("/students"); // fallback
      } finally {
        setIsLoading(false);
      }
    }
    fetchStudent();
  }, [params.id, router]);

  // 2) Fetch the latest prediction from PREDICTIONS table
  useEffect(() => {
    async function fetchPrediction() {
      try {
        const res = await fetch(`/api/predictions/${params.id}`);
        if (!res.ok) throw new Error("Failed to load prediction");
        const data = await res.json();
        setPrediction(data);
      } catch (e) {
        console.error("Prediction fetch error:", e);
      } finally {
        setIsPredLoading(false);
      }
    }
    fetchPrediction();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <AlertTriangle className="h-12 w-12 text-brown-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-brown-800 mb-2">Student Not Found</h2>
          <p className="text-brown-600 mb-6">
            The student you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/students">Back to Students</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Helper for badge rendering
  const badgeVariant =
    prediction?.predicted_result === "pass" ? "default" : "destructive";
  const badgeText =
    prediction?.predicted_result === "pass" ? "Passing" : "At Risk";

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
          <Button className="bg-green-700 hover:bg-green-800">
            Run New Prediction
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Prediction Results */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-green-800">
                Prediction Results
              </CardTitle>
              <CardDescription>
                Latest analysis based on academic and behavioral data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  {prediction?.predicted_result === "pass" ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-brown-600 mr-3" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {badgeText}
                    </h3>
                    {isPredLoading ? (
                      <p className="text-muted-foreground">Loading…</p>
                    ) : (
                      <p className="text-muted-foreground">
                        {prediction?.confidence.toFixed(1)}% confidence
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant={badgeVariant}>{badgeText}</Badge>
              </div>
              {/* existing key‑factors UI… */}
            </CardContent>
          </Card>
        </motion.div>

        {/* Academic Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            {/* … rest of your academic summary UI … */}
          </Card>
        </motion.div>
      </div>

      {/* … rest of your tabs & charts … */}
    </div>
  );
}
