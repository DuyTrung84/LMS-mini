import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageCourses from "./pages/teacher/ManageCourses";
import CourseDetail from "./pages/teacher/CourseDetail";
import TeacherNotifications from "./pages/teacher/Notifications";
import TeacherStudents from "./pages/teacher/Students";
import TeacherStatistics from "./pages/teacher/Statistics";
import AdminUsers from "./pages/admin/Users";
import AdminRoles from "./pages/admin/Roles";
import AdminSettings from "./pages/admin/Settings";
import Progress from "./pages/student/Progress";
import MyCourses from "./pages/student/MyCourses";
import Courses from "./pages/student/Courses";
import Profile from "./pages/Profile";
import LessonView from "./pages/student/LessonView";
import QuizView from "./pages/student/QuizView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Ant Design Theme Config
const antTheme = {
  token: {
    colorPrimary: '#0066cc',
    colorSuccess: '#22c55e',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#0066cc',
    borderRadius: 8,
    fontFamily: 'Inter, system-ui, sans-serif',
  },
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-courses"
        element={
          <ProtectedRoute>
            <ManageCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/course/:id"
        element={
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/notifications"
        element={
          <ProtectedRoute>
            <TeacherNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/students"
        element={
          <ProtectedRoute>
            <TeacherStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/statistics"
        element={
          <ProtectedRoute>
            <TeacherStatistics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/roles"
        element={
          <ProtectedRoute>
            <AdminRoles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/progress"
        element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        }
      />      <Route
        path="/student/my-courses"
        element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/course/:id"
        element={
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/course/:courseId/lesson/:lessonId"
        element={
          <ProtectedRoute>
            <LessonView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/course/:courseId/quiz/:quizId"
        element={
          <ProtectedRoute>
            <QuizView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={antTheme} locale={viVN}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
