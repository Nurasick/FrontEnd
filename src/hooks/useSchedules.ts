import { useState, useEffect, useCallback } from "react";
import {
  schedulesApi,
  type GroupSchedule,
  type CreateGroupScheduleDto,
  type UpdateGroupScheduleDto,
} from "@/api";

export function useSchedules() {
  const [schedules, setSchedules] = useState<GroupSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await schedulesApi.getAll();
      setSchedules(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch schedules");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const getByGroupName = async (groupName: string) => {
    return schedulesApi.getByGroupName(groupName);
  };

  const createSchedule = async (data: CreateGroupScheduleDto) => {
    const newSchedule = await schedulesApi.create(data);
    setSchedules((prev) => [...prev, newSchedule]);
    return newSchedule;
  };

  const updateSchedule = async (id: number, data: UpdateGroupScheduleDto) => {
    const updated = await schedulesApi.update(id, data);
    setSchedules((prev) =>
      prev.map((schedule) => (schedule.id === id ? updated : schedule))
    );
    return updated;
  };

  const deleteSchedule = async (id: number) => {
    await schedulesApi.delete(id);
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
  };

  return {
    schedules,
    isLoading,
    error,
    refetch: fetchSchedules,
    getByGroupName,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
}
