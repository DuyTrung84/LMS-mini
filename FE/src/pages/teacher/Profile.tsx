import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Button, Avatar, Statistic, Space, Modal, Divider, Tag } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  SaveOutlined,
  EditOutlined,
  LockOutlined,
  LogoutOutlined,
  BookOutlined,
  TrophyOutlined,
  FireOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { mockCourses, mockStudentProgress } from '@/data/mockData';

const TeacherProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm] = Form.useForm();

  // Get teacher stats
  const myCourses = mockCourses;
  const courseProgress = mockStudentProgress;

  const activeCoursesCount = myCourses.length;
  const completedCoursesCount = myCourses.filter(c => c.status === 'archived').length;
  const avgProgress = courseProgress.length > 0
    ? Math.round(courseProgress.reduce((sum, p) => sum + p.progress, 0) / courseProgress.length)
    : 0;
  const completedLessons = courseProgress.reduce((sum, p) => sum + p.completedLessons, 0);

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
      setIsEditingProfile(false);
      Modal.success({
        title: 'Thành công',
        content: 'Hồ sơ đã được cập nhật',
      });
    } catch (error) {
      // Validation error
    }
  };

  const handleChangePassword = () => {
    Modal.confirm({
      title: 'Đổi mật khẩu',
      content: (
        <Form layout="vertical" className="mt-4">
          <Form.Item label="Mật khẩu hiện tại">
            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>
          <Form.Item label="Mật khẩu mới">
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item label="Xác nhận mật khẩu mới">
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
        </Form>
      ),
      okText: 'Cập nhật',
      cancelText: 'Hủy',
      onOk() {
        Modal.success({
          title: 'Thành công',
          content: 'Mật khẩu đã được đổi',
        });
      },
    });
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

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} sm={4}>
              <Avatar
                size={120}
                src={user?.avatar}
                icon={<UserOutlined />}
                className="border-4 border-white shadow-lg"
              />
            </Col>
            <Col xs={24} sm={20}>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{user?.name}</h1>
                <p className="text-muted-foreground mb-4">{user?.email}</p>
                <Space>
                  <Tag color="blue">Giáo viên</Tag>
                  <Tag color="green">Hoạt động</Tag>
                </Space>
              </div>
            </Col>
          </Row>
        </div>

        {/* Learning Statistics */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Thống kê học tập</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="border-0 shadow-soft bg-blue-50">
                <Statistic
                  title="Khóa học đang kỳ"
                  value={activeCoursesCount}
                  prefix={<BookOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="border-0 shadow-soft bg-green-50">
                <Statistic
                  title="Khóa hoàn thành"
                  value={completedCoursesCount}
                  prefix={<TrophyOutlined className="text-green-500" />}
                  valueStyle={{ color: '#22c55e' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="border-0 shadow-soft bg-amber-50">
                <Statistic
                  title="Tiến độ trung bình"
                  value={avgProgress}
                  suffix="%"
                  prefix={<FireOutlined className="text-amber-500" />}
                  valueStyle={{ color: '#f59e0b' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="border-0 shadow-soft bg-purple-50">
                <Statistic
                  title="Bài học hoàn thành"
                  value={completedLessons}
                  prefix={<FireOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#a855f7' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Account Info & Actions */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={14}>
            <Card className="border-0 shadow-soft" title="Thông tin tài khoản">
              <Form layout="vertical" form={editForm}>
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                  <Input
                    placeholder="Nhập tên"
                    disabled={!isEditingProfile}
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' },
                  ]}
                >
                  <Input
                    placeholder="Nhập email"
                    disabled={!isEditingProfile}
                    prefix={<MailOutlined />}
                  />
                </Form.Item>

                <Space>
                  {!isEditingProfile ? (
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={handleEditProfile}
                    >
                      Chỉnh sửa
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={handleSaveProfile}
                      >
                        Lưu
                      </Button>
                      <Button onClick={() => setIsEditingProfile(false)}>
                        Hủy
                      </Button>
                    </>
                  )}
                </Space>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={10}>
            <Card className="border-0 shadow-soft" title="Hoạt động gần đây">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-foreground">Tạo khóa học mới</p>
                  <p className="text-xs text-muted-foreground mt-1">2 ngày trước</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-foreground">Gửi thông báo cho sinh viên</p>
                  <p className="text-xs text-muted-foreground mt-1">5 ngày trước</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-foreground">Chỉnh sửa khóa học React</p>
                  <p className="text-xs text-muted-foreground mt-1">1 tuần trước</p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Security & Actions */}
        <Card className="border-0 shadow-soft" title="Bảo mật & hành động">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              block
              icon={<LockOutlined />}
              onClick={handleChangePassword}
            >
              Đổi mật khẩu
            </Button>
            <Button
              block
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </Space>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherProfile;
