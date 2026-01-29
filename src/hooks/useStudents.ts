import { useState, useEffect, useCallback } from "react";
import { studentsApi, type Student, type CreateStudentDto, type UpdateStudentDto } from "@/api";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await studentsApi.getAll();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch students");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const createStudent = async (data: CreateStudentDto) => {
    const newStudent = await studentsApi.create(data);
    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = async (id: number, data: UpdateStudentDto) => {
    const updated = await studentsApi.update(id, data);
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? updated : student))
    );
    return updated;
  };

  const deleteStudent = async (id: number) => {
    await studentsApi.delete(id);
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return {
    students,
    isLoading,
    error,
    refetch: fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
}
