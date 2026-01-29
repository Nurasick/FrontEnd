import { apiClient } from "./client";
import type { Student, CreateStudentDto, UpdateStudentDto } from "./types";

export const studentsApi = {
  getAll: () => apiClient.get<Student[]>("/students"),

  getById: (id: number) => apiClient.get<Student>(`/students/${id}`),

  create: (data: CreateStudentDto) =>
    apiClient.post<Student>("/students", data),

  update: (id: number, data: UpdateStudentDto) =>
    apiClient.patch<Student>(`/students/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/students/${id}`),
};
