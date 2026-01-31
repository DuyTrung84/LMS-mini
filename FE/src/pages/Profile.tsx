import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StudentProfile from './student/Profile';
import TeacherProfile from './teacher/Profile';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === 'teacher') {
    return <TeacherProfile />;
  }

  return <StudentProfile />;
};

export default ProfilePage;
