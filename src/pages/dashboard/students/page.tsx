import { useState } from "react";
import { Search, Plus, MoreHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddStudentForm } from "@/pages/dashboard/students/add/page";
import {useGroups} from "@/hooks/useGroups"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { useStudents } from "@/hooks";

export function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { students, isLoading, error,refetch } = useStudents();
  const { groups, isLoading: groupsLoading } = useGroups();


  const filteredStudents = students.filter(
    (student) =>
      `${student.firstname} ${student.surname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.group_name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const getInitials = (firstname: string, surname: string) => {
    return `${firstname[0] || ""}${surname[0] || ""}`.toUpperCase();
  };

  const uniqueGroups = [...new Set(students.map((s) => s.group_name))];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center bg-slate-900 text-slate-200">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground text-slate-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center bg-slate-900 text-slate-200">
        <div className="text-center">
          <p className="text-red-500 font-semibold">{error}</p>
          <p className="text-sm text-slate-400 mt-2">
            Make sure the backend server is running
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-slate-900 text-slate-100 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">Students</h1>
          <p className="text-slate-300">
            Manage and view all registered students
          </p>
        </div>
        <Dialog>
  <DialogTrigger asChild>
    <Button className="bg-slate-700 hover:bg-slate-600 text-slate-200"
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Student
    </Button>
  </DialogTrigger>

  <DialogContent className="bg-slate-800 text-slate-200 rounded-md">
    <DialogHeader>
      <DialogTitle>Add new student</DialogTitle>
    </DialogHeader>

    <AddStudentForm groups={groups} onStudentAdded={() => refetch()}/>
  </DialogContent>
</Dialog>

      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className = "bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-200">{students.length}</div>
            <p className="text-xs text-slate-400">
              Across all groups
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-200">{uniqueGroups.length}</div>
            <p className="text-xs text-slate-400">
              Active groups
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Student Directory</CardTitle>
          <CardDescription className="text-slate-400">
            A list of all students with their contact information and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700 text-slate-100 placeholder-slate-400 border-slate-600"
              />
            </div>
          </div>

          <Table className="bg-slate-800 border-slate-700 text-slate-100">
            <TableHeader>
              <TableRow>
                <TableHead className="text-slate-100">Student</TableHead>
                <TableHead className="text-slate-100">Group</TableHead>
                <TableHead className="text-slate-100">Course Year</TableHead>
                <TableHead className="text-slate-100">Gender</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-slate-700">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-slate-600 text-slate-100 text-xs">
                            {getInitials(student.firstname, student.surname)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-slate-100">
                            {student.firstname} {student.surname}
                          </div>
                          <div className="text-sm text-slate-300">
                            ID: {student.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-slate-100 border-slate-500">{student.group_name}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-600 text-slate-100">Year {student.year}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm capitalize text-slate-100">{student.gender}</span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-slate-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
