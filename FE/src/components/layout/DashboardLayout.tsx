import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Badge } from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  TeamOutlined,
  BarChartOutlined,
  ReadOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      },
    ];

    if (user?.role === 'STUDENT') {
      return [
        ...baseItems,
        { key: '/student/courses', icon: <BookOutlined />, label: 'Khóa học' },
        { key: '/student/my-courses', icon: <ReadOutlined />, label: 'Khóa học của tôi' },
        { key: '/student/progress', icon: <BarChartOutlined />, label: 'Tiến độ học tập' },
        { key: '/profile', icon: <UserOutlined />, label: 'Hồ sơ cá nhân' },
      ];
    }

    if (user?.role === 'TEACHER') {
      return [
        ...baseItems,
        { key: '/manage-courses', icon: <BookOutlined />, label: 'Quản lý khóa học' },
        { key: '/teacher/notifications', icon: <BellOutlined />, label: 'Gửi thông báo' },
        { key: '/teacher/students', icon: <TeamOutlined />, label: 'Sinh viên' },
        { key: '/teacher/statistics', icon: <BarChartOutlined />, label: 'Thống kê' },
        { key: '/profile', icon: <UserOutlined />, label: 'Hồ sơ cá nhân' },
      ];
    }

    if (user?.role === 'ADMIN') {
      return [
        ...baseItems,
        { key: '/admin/users', icon: <TeamOutlined />, label: 'Quản lý người dùng' },
        { key: '/admin/roles', icon: <SafetyOutlined />, label: 'Phân quyền' },
        { key: '/all-courses', icon: <BookOutlined />, label: 'Tất cả khóa học' },
        { key: '/admin/settings', icon: <SettingOutlined />, label: 'Cấu hình hệ thống' },
      ];
    }

    return baseItems;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ cá nhân',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  const getRoleBadge = () => {
    switch (user?.role) {
      case "STUDENT":
        return "Sinh viên";
      case "TEACHER":
        return "Giảng viên";
      case "ADMIN":
        return "Quản trị viên";
      default:
        return "";
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="!bg-sidebar"
        width={260}
      >
        <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
          {!collapsed ? (
            <span className="text-xl font-bold text-sidebar-primary">
              📚 LMS Portal
            </span>
          ) : (
            <span className="text-2xl">📚</span>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={getMenuItems()}
          onClick={({ key }) => navigate(key)}
          className="!bg-transparent !border-none mt-4"
          style={{
            background: "transparent",
          }}
          theme="dark"
        />
      </Sider>

      <Layout>
        <Header className="!bg-card !px-6 flex items-center justify-between shadow-soft border-b border-border">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />

          <div className="flex items-center gap-4">
            <Badge count={3} size="small">
              <Button
                type="text"
                icon={<BellOutlined className="text-lg" />}
                className="flex items-center justify-center"
              />
            </Badge>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center gap-3 cursor-pointer hover:bg-muted rounded-lg px-3 py-2 transition-colors">
                <Avatar src={user?.avatar} icon={<UserOutlined />} />
                <div className="hidden md:flex md:flex-col">
                  <div className="font-medium text-foreground leading-tight">
                    {user?.name}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    {getRoleBadge()}
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="m-6 p-6 bg-card rounded-lg shadow-soft min-h-[calc(100vh-120px)]">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
