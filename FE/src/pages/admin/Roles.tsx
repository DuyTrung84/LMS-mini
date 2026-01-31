import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Modal, Form, Input, Select, Switch, Tag, Space, Divider, Statistic } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, TeamOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  status: 'active' | 'inactive';
  permissions: string[];
  createdAt: string;
}

const AdminRoles = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Student',
      description: 'Sinh viên - Người học các khóa học',
      usersCount: 45,
      status: 'active',
      permissions: ['view_courses', 'submit_assignments', 'view_grades', 'post_comments'],
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Teacher',
      description: 'Giáo viên - Quản lý khóa học và sinh viên',
      usersCount: 8,
      status: 'active',
      permissions: ['create_courses', 'manage_courses', 'grade_assignments', 'send_notifications', 'view_analytics'],
      createdAt: '2024-01-15',
    },
    {
      id: '3',
      name: 'Admin',
      description: 'Quản trị viên - Toàn quyền hệ thống',
      usersCount: 2,
      status: 'active',
      permissions: ['all_access', 'manage_users', 'manage_roles', 'system_config', 'view_analytics', 'manage_courses'],
      createdAt: '2024-01-15',
    },
  ]);

  const allPermissions: Permission[] = [
    { id: 'view_courses', name: 'Xem khóa học', description: 'Xem danh sách khóa học' },
    { id: 'create_courses', name: 'Tạo khóa học', description: 'Tạo khóa học mới' },
    { id: 'manage_courses', name: 'Quản lý khóa học', description: 'Chỉnh sửa và xóa khóa học' },
    { id: 'submit_assignments', name: 'Nộp bài tập', description: 'Nộp và quản lý bài tập' },
    { id: 'grade_assignments', name: 'Chấm điểm', description: 'Chấm điểm bài tập' },
    { id: 'view_grades', name: 'Xem điểm', description: 'Xem điểm số' },
    { id: 'post_comments', name: 'Bình luận', description: 'Đăng bình luận trên khóa học' },
    { id: 'send_notifications', name: 'Gửi thông báo', description: 'Gửi thông báo đến người dùng' },
    { id: 'manage_users', name: 'Quản lý người dùng', description: 'Tạo, chỉnh sửa, xóa người dùng' },
    { id: 'manage_roles', name: 'Quản lý vai trò', description: 'Quản lý vai trò và quyền hạn' },
    { id: 'system_config', name: 'Cấu hình hệ thống', description: 'Cấu hình hệ thống' },
    { id: 'view_analytics', name: 'Xem phân tích', description: 'Xem phân tích và báo cáo' },
    { id: 'all_access', name: 'Toàn quyền', description: 'Truy cập toàn bộ hệ thống' },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  const handleAddRole = () => {
    setEditingRole(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue({
      name: role.name,
      description: role.description,
      status: role.status === 'active',
      permissions: role.permissions,
    });
    setIsModalVisible(true);
  };

  const handleSaveRole = () => {
    form.validateFields().then((values) => {
      if (editingRole) {
        setRoles(
          roles.map((r) =>
            r.id === editingRole.id
              ? {
                  ...r,
                  ...values,
                  status: values.status ? 'active' : 'inactive',
                }
              : r
          )
        );
      } else {
        const newRole: Role = {
          id: Math.max(...roles.map((r) => parseInt(r.id)), 0) + 1 + '',
          ...values,
          status: values.status ? 'active' : 'inactive',
          usersCount: 0,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setRoles([...roles, newRole]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDeleteRole = (id: string) => {
    Modal.confirm({
      title: 'Xóa vai trò',
      content: 'Bạn có chắc chắn muốn xóa vai trò này? Người dùng sẽ không còn có vai trò này.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setRoles(roles.filter((r) => r.id !== id));
        Modal.success({
          title: 'Thành công',
          content: 'Vai trò đã được xóa',
        });
      },
    });
  };

  const columns = [
    {
      title: 'Vai trò',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 250,
    },
    {
      title: 'Số người dùng',
      dataIndex: 'usersCount',
      key: 'usersCount',
      width: 120,
      align: 'center' as const,
      render: (count: number) => <Tag color="blue">{count} người</Tag>,
    },
    {
      title: 'Quyền hạn',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <span>{permissions.length} quyền</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      align: 'center' as const,
      render: (_: any, record: Role) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditRole(record)}
          />
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRole(record.id)}
            disabled={record.usersCount > 0}
            title={record.usersCount > 0 ? 'Không thể xóa vai trò còn người dùng' : ''}
          />
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Stats */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Tổng vai trò"
                value={roles.length}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Vai trò hoạt động"
                value={roles.filter((r) => r.status === 'active').length}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Tổng quyền hạn"
                value={allPermissions.length}
                prefix={<LockOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Người dùng"
                value={roles.reduce((sum, r) => sum + r.usersCount, 0)}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row gutter={16}>
          <Col xs={24} lg={16}>
            <Card className="border-0 shadow-soft" title="Quản lý vai trò">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddRole}
                className="mb-4"
              >
                Thêm vai trò
              </Button>
              <Table
                columns={columns}
                dataSource={roles}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Col>

          {/* Permissions Reference */}
          <Col xs={24} lg={8}>
            <Card className="border-0 shadow-soft" title="Danh sách quyền hạn">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {allPermissions.map((perm) => (
                  <div key={perm.id} className="pb-3 border-b">
                    <div className="font-medium text-sm">{perm.name}</div>
                    <div className="text-xs text-gray-500">{perm.description}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Modal */}
        <Modal
          title={editingRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
          open={isModalVisible}
          onOk={handleSaveRole}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên vai trò"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}
            >
              <Input placeholder="Ví dụ: Editor, Moderator" />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả vai trò' }]}
            >
              <Input.TextArea rows={3} placeholder="Mô tả vai trò" />
            </Form.Item>

            <Form.Item
              label="Quyền hạn"
              name="permissions"
              rules={[{ required: true, message: 'Vui lòng chọn ít nhất một quyền hạn' }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn quyền hạn"
                options={allPermissions.map((p) => ({
                  label: p.name,
                  value: p.id,
                }))}
              />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default AdminRoles;
