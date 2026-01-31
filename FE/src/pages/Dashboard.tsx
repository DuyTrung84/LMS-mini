import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './student/StudentDashboard';
import TeacherDashboard from './teacher/TeacherDashboard';
import AdminDashboard from './admin/AdminDashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'STUDENT':
        return <StudentDashboard />;
      case 'TEACHER':
        return <TeacherDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
