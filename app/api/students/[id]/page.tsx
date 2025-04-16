"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch(`/api/students/${id}`);
      const data = await res.json();
      setStudent(data);
    };

    fetchStudent();
  }, [id]);

  if (!student) return <p className="p-6">Loading student...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student: {student.FIRST_NAME} {student.LAST_NAME}</h1>
      <p><strong>ID:</strong> {student.ID}</p>
      <p><strong>Grade:</strong> {student.GRADE}</p>
      <p><strong>Average Grade:</strong> {student.AVERAGE_GRADE}</p>
      <p><strong>Attendance:</strong> {student.ATTENDANCE}</p>
      <p><strong>Status:</strong> {student.PREVIOUS_PERFORMANCE}</p>
      <p><strong>Email:</strong> {student.EMAIL}</p>
    </div>
  );
}
