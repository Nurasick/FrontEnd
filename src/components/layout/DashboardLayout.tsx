import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "./Sidebar";

export function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-slate-900">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
