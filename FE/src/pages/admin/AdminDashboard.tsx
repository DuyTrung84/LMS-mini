import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Modal, Form, Input, Select, message, Avatar, Space, Progress } from 'antd';
import {
  TeamOutlined,
  BookOutlined,
  UserAddOutlined,
  SettingOutlined,
  LockOutlined,
  UnlockOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SafetyOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { mockUsers, dashboardStats, UserAccount } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stats = dashboardStats.admin;
  const [users, setUsers] = useState<UserAccount[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [form] = Form.useForm();

  // Recent users (last 5)
  const recentUsers = users.slice(0, 5);

  const handleToggleLock = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'active' ? 'locked' : 'active';
        message.success(`Tài khoản đã được ${newStatus === 'active' ? 'mở khóa' : 'khóa'}`);
        return { ...u, status: newStatus as 'active' | 'locked' };
      }
      return u;
    }));
  };

  const handleEdit = (record: UserAccount) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...values } : u));
        message.success('Cập nhật thành công!');
      } else {
        const newUser: UserAccount = {
          id: String(users.length + 1),
          ...values,
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0],
          lastLogin: '-',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${users.length + 1}`,
        };
        setUsers([...users, newUser]);
        message.success('Thêm người dùng thành công!');
      }
      setIsModalOpen(false);
    } catch (error) {
      // Form validation error
    }
  };

  const columns = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_: any, record: UserAccount) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div className="font-medium text-foreground">{record.name}</div>
            <div className="text-xs text-muted-foreground">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : role === 'teacher' ? 'blue' : 'green'}>
          {role === 'admin' ? 'Quản trị viên' : role === 'teacher' ? 'Giảng viên' : 'Sinh viên'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? 'Hoạt động' : 'Bị khóa'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Đăng nhập cuối',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: UserAccount) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            icon={record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}
            onClick={() => handleToggleLock(record.id)}
            danger={record.status === 'active'}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="gradient-hero rounded-xl p-6 text-white">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={18}>
            <h1 className="text-2xl font-bold mb-2">
              Quản trị hệ thống, {user?.name}! ⚙️
            </h1>
            <p className="text-white/80 mb-4">
              Có {stats.newUsersThisMonth} người dùng mới trong tháng này. Hệ thống đang hoạt động ổn định.
            </p>
            <Button
              size="large"
              icon={<UserAddOutlined />}
              className="!bg-white !text-primary !border-none hover:!bg-white/90"
              onClick={handleAddNew}
            >
              Thêm người dùng mới
            </Button>
          </Col>
          <Col xs={24} md={6} className="text-right">
            <SettingOutlined className="text-6xl text-white/30" />
          </Col>
        </Row>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Tổng người dùng"
              value={stats.totalUsers}
              prefix={<TeamOutlined className="text-primary" />}
              valueStyle={{ color: 'hsl(var(--primary))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Người dùng hoạt động"
              value={stats.activeUsers}
              prefix={<UserOutlined className="text-success" />}
              valueStyle={{ color: 'hsl(var(--success))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Tổng khóa học"
              value={stats.totalCourses}
              prefix={<BookOutlined className="text-secondary" />}
              valueStyle={{ color: 'hsl(var(--secondary))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Người dùng mới (tháng)"
              value={stats.newUsersThisMonth}
              prefix={<UserAddOutlined className="text-warning" />}
              valueStyle={{ color: 'hsl(var(--warning))' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Users Table */}
      <Card
        title={
          <span className="text-lg font-semibold">
            <TeamOutlined className="mr-2 text-primary" />
            Phân bổ vai trò
          </span>
        }
        className="border-0 shadow-soft"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Sinh viên</span>
              <span className="text-sm font-semibold">{users.filter(u => u.role === 'student').length} ({Math.round((users.filter(u => u.role === 'student').length / users.length) * 100)}%)</span>
            </div>
            <Progress
              percent={Math.round((users.filter(u => u.role === 'student').length / users.length) * 100)}
              strokeColor="#1890ff"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Giáo viên</span>
              <span className="text-sm font-semibold">{users.filter(u => u.role === 'teacher').length} ({Math.round((users.filter(u => u.role === 'teacher').length / users.length) * 100)}%)</span>
            </div>
            <Progress
              percent={Math.round((users.filter(u => u.role === 'teacher').length / users.length) * 100)}
              strokeColor="#13c2c2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Quản trị viên</span>
              <span className="text-sm font-semibold">{users.filter(u => u.role === 'admin').length} ({Math.round((users.filter(u => u.role === 'admin').length / users.length) * 100)}%)</span>
            </div>
            <Progress
              percent={Math.round((users.filter(u => u.role === 'admin').length / users.length) * 100)}
              strokeColor="#f5222d"
            />
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <span className="text-lg font-semibold">
                <UserOutlined className="mr-2 text-primary" />
                Người dùng mới
              </span>
            }
            extra={
              <Button 
                type="link" 
                icon={<ArrowRightOutlined />}
                onClick={() => navigate('/admin/users')}
              >
                Xem tất cả
              </Button>
            }
            className="border-0 shadow-soft"
          >
            <div className="space-y-3">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar src={u.avatar} icon={<UserOutlined />} />
                    <div>
                      <div className="font-medium text-foreground">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                  <Tag color={u.role === 'admin' ? 'red' : u.role === 'teacher' ? 'blue' : 'green'}>
                    {u.role === 'admin' ? 'Admin' : u.role === 'teacher' ? 'Giáo viên' : 'Sinh viên'}
                  </Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <span className="text-lg font-semibold">
                <SettingOutlined className="mr-2 text-secondary" />
                Quản lý hệ thống
              </span>
            }
            className="border-0 shadow-soft"
          >
            <div className="space-y-3">
              <Button 
                block 
                className="text-left h-auto py-3 border-0 hover:!bg-blue-50"
                onClick={() => navigate('/admin/users')}
              >
                👥 Quản lý người dùng
              </Button>
              <Button 
                block 
                className="text-left h-auto py-3 border-0 hover:!bg-blue-50"
                onClick={() => navigate('/admin/roles')}
              >
                🔐 Phân quyền và vai trò
              </Button>
              <Button 
                block 
                className="text-left h-auto py-3 border-0 hover:!bg-blue-50"
                onClick={() => navigate('/admin/settings')}
              >
                ⚙️ Cấu hình hệ thống
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* User Modal */}
      <Modal
        title={editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText={editingUser ? 'Cập nhật' : 'Thêm mới'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Select placeholder="Chọn vai trò">
              <Select.Option value="student">Sinh viên</Select.Option>
              <Select.Option value="teacher">Giảng viên</Select.Option>
              <Select.Option value="admin">Quản trị viên</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
