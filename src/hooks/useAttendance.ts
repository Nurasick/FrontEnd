import { useState, useEffect, useCallback } from "react";
import {
  attendanceApi,
  type Attendance,
  type CreateAttendanceDto,
  type UpdateAttendanceDto,
} from "@/api";

export function useAttendance() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await attendanceApi.getAll();
      setAttendance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch attendance");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const getByStudentId = async (studentId: number) => {
    return attendanceApi.getByStudentId(studentId);
  };

  const getBySubjectId = async (subjectId: number) => {
    return attendanceApi.getBySubjectId(subjectId);
  };

  const createAttendance = async (data: CreateAttendanceDto) => {
    const newRecord = await attendanceApi.create(data);
    setAttendance((prev) => [...prev, newRecord]);
    return newRecord;
  };

  const updateAttendance = async (id: number, data: UpdateAttendanceDto) => {
    const updated = await attendanceApi.update(id, data);
    setAttendance((prev) =>
      prev.map((record) => (record.id === id ? updated : record))
    );
    return updated;
  };

  const deleteAttendance = async (id: number) => {
    await attendanceApi.delete(id);
    setAttendance((prev) => prev.filter((record) => record.id !== id));
  };

  return {
    attendance,
    isLoading,
    error,
    refetch: fetchAttendance,
    getByStudentId,
    getBySubjectId,
    createAttendance,
    updateAttendance,
    deleteAttendance,
  };
}
