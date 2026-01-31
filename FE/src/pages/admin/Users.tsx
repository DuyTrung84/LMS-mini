import React, { useState } from 'react';
import { Card, Row, Col, Table, Input, Button, Select, Tag, Avatar, Modal, Dropdown, Statistic } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import {
  SearchOutlined,
  PlusOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  CalendarOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockUsers } from '@/data/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'active' | 'locked';
  createdAt: string;
  lastLogin: string;
  avatar: string;
}

const AdminUsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [users, setUsers] = useState<User[]>(mockUsers as User[]);

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleLabels: Record<string, string> = {
    student: 'Sinh viên',
    teacher: 'Giáo viên',
    admin: 'Quản trị viên',
  };

  const roleColors: Record<string, string> = {
    student: 'blue',
    teacher: 'cyan',
    admin: 'red',
  };

  const handleToggleLock = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    Modal.confirm({
      title: user.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản',
      content: `Bạn có chắc chắn muốn ${
        user.status === 'active' ? 'khóa' : 'mở khóa'
      } tài khoản của ${user.name}?`,
      okText: user.status === 'active' ? 'Khóa' : 'Mở khóa',
      cancelText: 'Hủy',
      okType: user.status === 'active' ? 'danger' : 'primary',
      onOk() {
        setUsers(
          users.map(u =>
            u.id === userId
              ? {
                  ...u,
                  status: u.status === 'active' ? 'locked' : 'active',
                }
              : u
          )
        );
        Modal.success({
          title: 'Thành công',
          content: user.status === 'active' ? 'Đã khóa tài khoản' : 'Đã mở khóa tài khoản',
          okText: 'Đóng',
        });
      },
    });
  };

  const handleDelete = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    Modal.confirm({
      title: 'Xóa người dùng',
      content: `Bạn có chắc chắn muốn xóa tài khoản của ${user.name}? Hành động này không thể hoàn tác.`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk() {
        setUsers(users.filter(u => u.id !== userId));
        Modal.success({
          title: 'Thành công',
          content: 'Đã xóa người dùng',
          okText: 'Đóng',
        });
      },
    });
  };

  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: string, record: User) => (
        <div className="flex items-center gap-3">
          <Avatar
            size="large"
            src={record.avatar}
            icon={<UserOutlined />}
          />
          <div>
            <p className="font-medium text-foreground">{text}</p>
            <p className="text-xs text-muted-foreground">{record.id}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 180,
      render: (text: string) => (
        <span className="text-muted-foreground flex items-center gap-2">
          <MailOutlined /> {text}
        </span>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: string) => (
        <Tag color={roleColors[role]}>
          {roleLabels[role]}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => (
        <span className="text-muted-foreground flex items-center gap-2">
          <CalendarOutlined />
          {new Date(date).toLocaleDateString('vi-VN')}
        </span>
      ),
    },
    {
      title: 'Lần đăng nhập cuối',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: 150,
      render: (date: string) => (
        <span className="text-muted-foreground">
          {new Date(date).toLocaleDateString('vi-VN')}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        if (status === 'locked') {
          return (
            <Tag icon={<LockOutlined />} color="red">
              Đã khóa
            </Tag>
          );
        }
        return (
          <Tag color="green">
            Hoạt động
          </Tag>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      align: 'center' as const,
      render: (_, record: User) => {
        const menuItems: ItemType[] = [
          {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Chỉnh sửa',
            onClick: () =>
              Modal.info({
                title: 'Chỉnh sửa người dùng',
                content: 'Tính năng này sẽ được cập nhật trong phiên bản tiếp theo',
                okText: 'Đóng',
              }),
          },
          {
            key: 'lock',
            icon: record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />,
            label: record.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa',
            danger: record.status === 'active',
            onClick: () => handleToggleLock(record.id),
          },
          {
            type: 'divider',
          } as ItemType,
          {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Xóa',
            danger: true,
            onClick: () => handleDelete(record.id),
          },
        ];

        return (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['hover']}
            placement="bottomRight"
          >
            <Button
              type="text"
              size="small"
              icon={<MoreOutlined />}
              style={{ fontSize: '18px' }}
            />
          </Dropdown>
        );
      },
    },
  ];

  const studentCount = users.filter(u => u.role === 'student').length;
  const teacherCount = users.filter(u => u.role === 'teacher').length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const activeCount = users.filter(u => u.status === 'active').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý người dùng</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tài khoản, vai trò và quyền truy cập
          </p>
        </div>

        {/* Stats */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Tổng người dùng"
                value={users.length}
                prefix={<UserOutlined className="text-primary" />}
                valueStyle={{ color: 'hsl(var(--primary))' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Sinh viên"
                value={studentCount}
                prefix={<TeamOutlined className="text-blue-500" />}
                valueStyle={{ color: '#3b82f6' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Giáo viên"
                value={teacherCount}
                prefix={<UserOutlined className="text-cyan-500" />}
                valueStyle={{ color: '#06b6d4' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Tài khoản hoạt động"
                value={activeCount}
                prefix={<UserOutlined className="text-success" />}
                valueStyle={{ color: 'hsl(var(--success))' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="border-0 shadow-soft">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={16}>
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="large"
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                value={roleFilter}
                onChange={setRoleFilter}
                size="large"
                style={{ width: '100%' }}
                options={[
                  { label: 'Tất cả vai trò', value: 'all' },
                  { label: 'Sinh viên', value: 'student' },
                  { label: 'Giáo viên', value: 'teacher' },
                  { label: 'Quản trị viên', value: 'admin' },
                ]}
              />
            </Col>
          </Row>
        </Card>

        {/* Users Table */}
        <Card className="border-0 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Danh sách người dùng ({filteredUsers.length})
            </h2>
          </div>

          <Table
            columns={columns}
            dataSource={filteredUsers.map((user) => ({
              ...user,
              key: user.id,
            }))}
            pagination={{ pageSize: 10, total: filteredUsers.length }}
            className="ant-table-responsive"
            scroll={{ x: 1200 }}
            locale={{
              emptyText: 'Không tìm thấy người dùng nào',
            }}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsersPage;
