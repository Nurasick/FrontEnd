// Auth Types
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  user: UserResponse;
}

// Student Types
export interface Student {
  id: number;
  firstname: string;
  surname: string;
  group_name: string;
  major: string;
  course_year: number;
  gender: string;
  birth_date: string;
}

export interface CreateStudentDto {
  firstname: string;
  surname: string;
  group_name: string;
  major: string;
  course_year: number;
  gender: string;
  birth_date: string;
}

export interface UpdateStudentDto {
  firstname?: string;
  surname?: string;
  group_name?: string;
  major?: string;
  course_year?: number;
  gender?: string;
  birth_date?: string;
}

// Group Schedule Types
export interface GroupSchedule {
  id: number;
  group_name: string;
  schedule: string[];
}

export interface CreateGroupScheduleDto {
  group_name: string;
  schedule: string[];
}

export interface UpdateGroupScheduleDto {
  group_name?: string;
  schedule?: string[];
}

// Attendance Types
export interface Attendance {
  id: number;
  subject_name: string;
  subject_id: number;
  visit_day: string;
  visited: boolean;
  student_firstname: string;
  student_surname: string;
  student_id: number;
}

export interface CreateAttendanceDto {
  subject_name: string;
  subject_id: number;
  visit_day: string;
  visited: boolean;
  student_firstname: string;
  student_surname: string;
  student_id: number;
}

export interface UpdateAttendanceDto {
  subject_name?: string;
  subject_id?: number;
  visit_day?: string;
  visited?: boolean;
  student_firstname?: string;
  student_surname?: string;
  student_id?: number;
}
