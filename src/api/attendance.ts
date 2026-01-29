import { apiClient } from "./client";
import type {
  Attendance,
  CreateAttendanceDto,
  UpdateAttendanceDto,
} from "./types";

export const attendanceApi = {
  getAll: () => apiClient.get<Attendance[]>("/attendance"),

  getById: (id: number) => apiClient.get<Attendance>(`/attendance/${id}`),

  getByStudentId: (studentId: number) =>
    apiClient.get<Attendance[]>(`/attendance/student/${studentId}`),

  getBySubjectId: (subjectId: number) =>
    apiClient.get<Attendance[]>(`/attendance/subject/${subjectId}`),

  create: (data: CreateAttendanceDto) =>
    apiClient.post<Attendance>("/attendance", data),

  update: (id: number, data: UpdateAttendanceDto) =>
    apiClient.patch<Attendance>(`/attendance/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/attendance/${id}`),
};
