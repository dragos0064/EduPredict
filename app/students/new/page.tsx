"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function NewStudent() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/students")
    }, 1500)
  }

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter the student's basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input id="studentId" placeholder="e.g., ST-1234" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input id="dateOfBirth" type="date" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="student@school.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="(123) 456-7890" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter student's address" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>Enter the student's academic details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9">9th Grade</SelectItem>
                          <SelectItem value="10">10th Grade</SelectItem>
                          <SelectItem value="11">11th Grade</SelectItem>
                          <SelectItem value="12">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="averageGrade">Average Grade (1-10)</Label>
                      <Input id="averageGrade" type="number" step="0.1" min="1" max="10" placeholder="e.g., 8.5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="attendance">Attendance Rate (%)</Label>
                      <Input id="attendance" type="number" min="0" max="100" placeholder="e.g., 95" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Previous Academic Performance</Label>
                    <RadioGroup defaultValue="average" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="excellent" id="excellent" />
                        <Label htmlFor="excellent" className="cursor-pointer">
                          Excellent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="good" id="good" />
                        <Label htmlFor="good" className="cursor-pointer">
                          Good
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="average" id="average" />
                        <Label htmlFor="average" className="cursor-pointer">
                          Average
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="below-average" id="below-average" />
                        <Label htmlFor="below-average" className="cursor-pointer">
                          Below Average
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subjects">Current Subjects</Label>
                    <Textarea
                      id="subjects"
                      placeholder="List the student's current subjects (e.g., Math, Science, English)"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Enter any additional details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialNeeds">Special Educational Needs</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="iep">IEP</SelectItem>
                        <SelectItem value="504">504 Plan</SelectItem>
                        <SelectItem value="ell">ELL Support</SelectItem>
                        <SelectItem value="gifted">Gifted Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="extracurricular">Extracurricular Activities</Label>
                    <Textarea id="extracurricular" placeholder="List any clubs, sports, or activities" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Any other relevant information" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parent/Guardian Information</CardTitle>
                  <CardDescription>Enter contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Name</Label>
                    <Input id="parentName" placeholder="Parent/Guardian name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email</Label>
                    <Input id="parentEmail" type="email" placeholder="parent@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone</Label>
                    <Input id="parentPhone" placeholder="(123) 456-7890" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" type="button" asChild>
                  <Link href="/students">
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Link>
                </Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
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
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
