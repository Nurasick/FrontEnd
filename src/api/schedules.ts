import { apiClient } from "./client";
import type {
  GroupSchedule,
  CreateGroupScheduleDto,
  UpdateGroupScheduleDto,
} from "./types";

export const schedulesApi = {
  getAll: () => apiClient.get<GroupSchedule[]>("/group-schedules"),

  getById: (id: number) => apiClient.get<GroupSchedule>(`/group-schedules/${id}`),

  getByGroupName: (groupName: string) =>
    apiClient.get<GroupSchedule>(`/group-schedules/group/${encodeURIComponent(groupName)}`),

  create: (data: CreateGroupScheduleDto) =>
    apiClient.post<GroupSchedule>("/group-schedules", data),

  update: (id: number, data: UpdateGroupScheduleDto) =>
    apiClient.patch<GroupSchedule>(`/group-schedules/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/group-schedules/${id}`),
};
