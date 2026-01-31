import { NavLink, useNavigate } from "react-router";
import {
  Users,
  Calendar,
  ClipboardCheck,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Students",
    href: "/dashboard/students",
    icon: Users,
  },
  /*
  {
    title: "Group Schedules",
    href: "/dashboard/schedules",
    icon: Calendar,
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: ClipboardCheck,
  },
  */
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (email: string) => {
    const name = email.split("@")[0];
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 border-r border-slate-800 text-slate-100">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
        <span className="text-xl font-bold text-slate-100">UniverPortal</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white bg-slate-800"
                  : "text-slate-200 hover:bg-slate-700 hover:text-white"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </NavLink>
        ))}
      </nav>

      {/* User Info / Logout */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 bg-slate-800">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-white text-xs">
              {user?.email ? getInitials(user.email) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-slate-100">
              {user?.email?.split("@")[0]}
            </p>
            <p className="truncate text-xs text-slate-300">{user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="shrink-0 text-slate-200 hover:text-white hover:bg-slate-600"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
