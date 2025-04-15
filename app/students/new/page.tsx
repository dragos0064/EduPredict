"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, Save, X } from "lucide-react";
import Link from "next/link";

export default function NewStudent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      grade: formData.get("grade"),
      averageGrade: parseFloat(formData.get("averageGrade") as string),
      attendance: parseInt(formData.get("attendance") as string),
      previousPerformance: formData.get("previousPerformance"),
      email: formData.get("email"),
    };

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.details || "Failed to add student");
      }

      alert("Student added successfully!");
      router.push("/students");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/students">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-green-800">Add New Student</h1>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input name="name" placeholder="Full name" required />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="student@example.com" required />
            </div>

            <div className="space-y-2">
              <Label>Grade</Label>
              <Input name="grade" placeholder="e.g., 10B" required />
            </div>

            <div className="space-y-2">
              <Label>Average Grade</Label>
              <Input name="averageGrade" type="number" step="0.1" placeholder="e.g., 8.5" required />
            </div>

            <div className="space-y-2">
              <Label>Attendance (%)</Label>
              <Input name="attendance" type="number" placeholder="e.g., 90" required />
            </div>

            <div className="space-y-2">
              <Label>Previous Academic Performance</Label>
              <RadioGroup name="previousPerformance" defaultValue="average" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="excellent" />
                  <Label htmlFor="excellent">Excellent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="good" />
                  <Label htmlFor="good">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="average" id="average" />
                  <Label htmlFor="average">Average</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="below-average" id="below-average" />
                  <Label htmlFor="below-average">Below Average</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/students">
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Link>
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-green-700 hover:bg-green-800">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Student
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
