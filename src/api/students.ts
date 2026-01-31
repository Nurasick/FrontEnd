import { apiClient } from "./client";
import type { Student, CreateStudentDto, UpdateStudentDto } from "./types";

export const studentsApi = {
  getAll: () => apiClient.get<Student[]>("/student/all"),

  getById: (id: number) => apiClient.get<Student>(`/student/${id}`),

  create: (data: CreateStudentDto) =>
    apiClient.post<Student>("/student", data),

  update: (id: number, data: UpdateStudentDto) =>
    apiClient.patch<Student>(`/student/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/student/${id}`),
};
