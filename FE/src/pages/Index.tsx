import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Spin } from 'antd';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Spin size="large" />
    </div>
  );
};

export default Index;
