import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import { LoginPage } from "./pages/login/page";
import { RegisterPage } from "./pages/register/page";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { StudentsPage } from "./pages/dashboard/students/page";
import { SchedulesPage } from "./pages/dashboard/schedules/page";
import { AttendancePage } from "./pages/dashboard/attendance/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/students" replace />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "schedules",
        element: <SchedulesPage />,
      },
      {
        path: "attendance",
        element: <AttendancePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
