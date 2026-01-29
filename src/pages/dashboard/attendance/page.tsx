import { useState } from "react";
import { Calendar, Check, X, Clock, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAttendance } from "@/hooks";
import type { Attendance } from "@/api";

export function AttendancePage() {
  const [selectedDate] = useState(new Date().toLocaleDateString());
  const { attendance, isLoading, error } = useAttendance();

  // Group attendance by student
  const studentAttendance = attendance.reduce(
    (acc, record) => {
      const key = record.student_id;
      if (!acc[key]) {
        acc[key] = {
          student_id: record.student_id,
          name: `${record.student_firstname} ${record.student_surname}`,
          records: [],
        };
      }
      acc[key].records.push(record);
      return acc;
    },
    {} as Record<number, { student_id: number; name: string; records: Attendance[] }>
  );

  const studentList = Object.values(studentAttendance);
  const totalStudents = studentList.length;
  const totalRecords = attendance.length;
  const presentCount = attendance.filter((r) => r.visited).length;
  const averageAttendance = totalRecords > 0 ? (presentCount / totalRecords) * 100 : 0;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };


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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track and manage student attendance records
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedDate}</div>
            <p className="text-xs text-muted-foreground">Current tracking day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "text-2xl font-bold",
                getAttendanceColor(averageAttendance)
              )}
            >
              {averageAttendance.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall attendance rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Records
            </CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
            <p className="text-xs text-muted-foreground">
              Attendance entries
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Tracked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Unique students</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            All attendance records from the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          {attendance.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No attendance records found</p>
              <p className="text-sm text-muted-foreground">
                Create attendance records using the backend API
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {getInitials(`${record.student_firstname} ${record.student_surname}`)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {record.student_firstname} {record.student_surname}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.subject_name}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(record.visit_day).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {record.visited ? (
                        <div className="flex justify-center">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                            <X className="h-4 w-4 text-red-600" />
                          </div>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Attendance by Subject</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(() => {
              const subjects = [...new Set(attendance.map((r) => r.subject_name))];
              if (subjects.length === 0) {
                return (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No subjects found
                  </p>
                );
              }
              return subjects.map((subject) => {
                const subjectRecords = attendance.filter(
                  (r) => r.subject_name === subject
                );
                const presentCount = subjectRecords.filter((r) => r.visited).length;
                const percentage = (presentCount / subjectRecords.length) * 100;

                return (
                  <div key={subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject}</span>
                      <span
                        className={cn(
                          "font-semibold",
                          getAttendanceColor(percentage)
                        )}
                      >
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all",
                          percentage >= 90
                            ? "bg-green-500"
                            : percentage >= 75
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              });
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-muted-foreground">Total Records</span>
              <span className="font-semibold">{totalRecords}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-muted-foreground">Students Tracked</span>
              <span className="font-semibold">{totalStudents}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-muted-foreground">Total Present</span>
              <span className="font-semibold text-green-600">{presentCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Absent</span>
              <span className="font-semibold text-red-600">
                {totalRecords - presentCount}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
