import { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSchedules } from "@/hooks";

const colors = [
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-green-100 text-green-800 border-green-200",
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-orange-100 text-orange-800 border-orange-200",
  "bg-pink-100 text-pink-800 border-pink-200",
  "bg-teal-100 text-teal-800 border-teal-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
  "bg-red-100 text-red-800 border-red-200",
  "bg-cyan-100 text-cyan-800 border-cyan-200",
  "bg-amber-100 text-amber-800 border-amber-200",
];

export function SchedulesPage() {
  const { schedules, isLoading, error } = useSchedules();
  const groups = schedules.map((s) => s.group_name);
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const currentSchedule = schedules.find((s) => s.group_name === selectedGroup);
  const currentScheduleItems = currentSchedule?.schedule || [];

  // Auto-select first group when schedules load
  if (schedules.length > 0 && !selectedGroup) {
    setSelectedGroup(schedules[0].group_name);
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">{error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Make sure the backend server is running
          </p>
        </div>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Group Schedules</h1>
            <p className="text-muted-foreground">
              View class schedules for each group
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No schedules found</p>
            <p className="text-sm text-muted-foreground">
              Create schedules using the backend API
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Group Schedules</h1>
          <p className="text-muted-foreground">
            View class schedules for each group
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>
                Class list for the selected group
              </CardDescription>
            </div>
            {groups.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const currentIndex = groups.indexOf(selectedGroup);
                    const prevIndex =
                      currentIndex <= 0 ? groups.length - 1 : currentIndex - 1;
                    setSelectedGroup(groups[prevIndex]);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Badge variant="outline" className="px-4 py-2 text-base">
                  {selectedGroup}
                </Badge>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const currentIndex = groups.indexOf(selectedGroup);
                    const nextIndex =
                      currentIndex >= groups.length - 1 ? 0 : currentIndex + 1;
                    setSelectedGroup(groups[nextIndex]);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {currentScheduleItems.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              No schedule items for this group
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {currentScheduleItems.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-lg border p-4 transition-shadow hover:shadow-md",
                    colors[index % colors.length]
                  )}
                >
                  <h4 className="font-semibold">{item}</h4>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {schedules.map((schedule) => (
          <Card
            key={schedule.id}
            className={cn(
              "cursor-pointer transition-colors hover:bg-accent",
              selectedGroup === schedule.group_name && "border-primary"
            )}
            onClick={() => setSelectedGroup(schedule.group_name)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{schedule.group_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total classes</span>
                <span className="font-medium">{schedule.schedule.length}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
