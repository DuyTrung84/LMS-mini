import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Button, Avatar, Statistic, Space, Modal, Divider, Tag, Timeline, Empty } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  SaveOutlined,
  EditOutlined,
  LockOutlined,
  LogoutOutlined,
  BookOutlined,
  TrophyOutlined,
  FireOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { mockStudentProgress } from '@/data/mockData';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Get student progress stats
  const studentProgress = mockStudentProgress;
  const completedCourses = studentProgress.filter(p => p.progress === 100).length;
  const totalProgress = studentProgress.length > 0
    ? Math.round(studentProgress.reduce((sum, p) => sum + p.progress, 0) / studentProgress.length)
    : 0;
  const totalLessons = studentProgress.reduce((sum, p) => sum + p.completedLessons, 0);

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    editForm.setFieldsValue({
      name: user?.name,
      email: user?.email,
    });
  };

  const handleSaveProfile = async () => {
    try {
      await editForm.validateFields();
      // Here you would typically make an API call to update the profile
      setIsEditingProfile(false);
      Modal.success({
        title: 'Thành công',
        content: 'Cập nhật hồ sơ thành công!',
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleLogout = () => {
    Modal.confirm({
      title: 'Đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk() {
        logout();
        navigate('/login');
      },
    });
  };

  const handleChangePassword = () => {
    Modal.confirm({
      title: 'Đổi mật khẩu',
      content: 'Bạn sẽ được yêu cầu nhập mật khẩu hiện tại và mật khẩu mới',
      okText: 'Tiếp tục',
      cancelText: 'Hủy',
      onOk() {
        // Here you would typically show a password change form
        Modal.success({
          title: 'Thành công',
          content: 'Đổi mật khẩu thành công!',
        });
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
          </p>
        </div>

        {/* Profile Header Card */}
        <Card className="border-0 shadow-soft overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/20 rounded-lg p-6 mb-6">
            <Row gutter={[24, 24]} align="middle">
              <Col>
                <Avatar 
                  size={120} 
                  icon={<UserOutlined />}
                  src={user?.avatar}
                  className="border-4 border-white shadow-lg"
                />
              </Col>
              <Col flex="auto">
                <h2 className="text-2xl font-bold text-foreground mb-1">{user?.name}</h2>
                <p className="text-muted-foreground mb-3 flex items-center gap-2">
                  <MailOutlined /> {user?.email}
                </p>
                <Space>
                  <Tag color="blue">{user?.role === 'student' ? 'Học viên' : user?.role}</Tag>
                  <Tag color="green">Hoạt động</Tag>
                </Space>
              </Col>
              <Col xs={24} sm="auto">
                <Space wrap>
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />}
                    onClick={handleEditProfile}
                  >
                    Chỉnh sửa hồ sơ
                  </Button>
                  <Button 
                    icon={<LockOutlined />}
                    onClick={handleChangePassword}
                  >
                    Đổi mật khẩu
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>

          {/* Learning Stats */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Thống kê học tập</h3>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card className="border-0 shadow-soft bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                  <Statistic
                    title="Khóa học đăng ký"
                    value={studentProgress.length}
                    prefix={<BookOutlined className="text-primary" />}
                    valueStyle={{ color: 'hsl(var(--primary))' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="border-0 shadow-soft bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                  <Statistic
                    title="Khóa hoàn thành"
                    value={completedCourses}
                    prefix={<TrophyOutlined className="text-success" />}
                    valueStyle={{ color: 'hsl(var(--success))' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="border-0 shadow-soft bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                  <Statistic
                    title="Tiến độ trung bình"
                    value={totalProgress}
                    suffix="%"
                    prefix={<FireOutlined className="text-warning" />}
                    valueStyle={{ color: 'hsl(var(--warning))' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="border-0 shadow-soft bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                  <Statistic
                    title="Bài học hoàn thành"
                    value={totalLessons}
                    prefix={<ClockCircleOutlined className="text-accent" />}
                    valueStyle={{ color: 'hsl(var(--accent))' }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Card>

        <Row gutter={[16, 16]}>
          {/* Account Information */}
          <Col xs={24} lg={12}>
            <Card className="border-0 shadow-soft h-full">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Thông tin tài khoản</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Tên đầy đủ</p>
                  <p className="font-medium text-foreground">{user?.name}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground">{user?.email}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">ID Người dùng</p>
                  <p className="font-medium text-foreground font-mono">{user?.id}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Vai trò</p>
                  <p className="font-medium text-foreground">
                    {user?.role === 'student' ? 'Học viên' : user?.role === 'teacher' ? 'Giáo viên' : 'Quản trị viên'}
                  </p>
                </div>
              </div>
            </Card>
          </Col>

          {/* Recent Activity */}
          <Col xs={24} lg={12}>
            <Card className="border-0 shadow-soft h-full">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Hoạt động gần đây</h3>
              {studentProgress.length > 0 ? (
                <Timeline
                  items={studentProgress.slice(0, 3).map(progress => ({
                    children: (
                      <div>
                        <p className="font-medium text-foreground">{progress.courseName}</p>
                        <p className="text-sm text-muted-foreground">
                          Truy cập lần cuối: {formatDate(progress.lastAccessed)}
                        </p>
                        <p className="text-sm text-primary font-medium mt-1">
                          Tiến độ: {progress.progress}%
                        </p>
                      </div>
                    ),
                    dot: (
                      <div className={`w-3 h-3 rounded-full ${progress.progress === 100 ? 'bg-success' : 'bg-primary'}`} />
                    ),
                  }))}
                />
              ) : (
                <Empty description="Chưa có hoạt động" />
              )}
            </Card>
          </Col>
        </Row>

        {/* Edit Profile Modal */}
        <Modal
          title="Chỉnh sửa hồ sơ cá nhân"
          open={isEditingProfile}
          onOk={handleSaveProfile}
          onCancel={() => setIsEditingProfile(false)}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form
            form={editForm}
            layout="vertical"
            className="mt-4"
          >
            <Form.Item
              label="Tên đầy đủ"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
            >
              <Input placeholder="Nhập tên của bạn" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input placeholder="Nhập email của bạn" />
            </Form.Item>
          </Form>
        </Modal>

        {/* Danger Zone */}
        <Card className="border-0 shadow-soft border-l-4 border-destructive">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Vùng nguy hiểm</h3>
              <p className="text-sm text-muted-foreground">
                Đăng xuất khỏi tài khoản của bạn
              </p>
            </div>
            <Button 
              type="primary" 
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
