import React, { useState } from 'react';
import { Card, Row, Col, Table, Input, Button, Tag, Avatar, Progress, Space, Modal } from 'antd';
import {
  SearchOutlined,
  MailOutlined,
  UserOutlined,
  CheckCircleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockStudentProgress, mockCourses, mockUsers } from '@/data/mockData';

const TeacherStudentsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Get teacher's courses (mock data - in real app would filter by teacher)
  const teacherCourses = mockCourses.filter(c => c.instructor === user?.name || !c.instructor);
  const teacherCourseIds = teacherCourses.map(c => c.id);

  // Get enrollments in teacher's courses
  const courseEnrollments = mockStudentProgress.filter(p => teacherCourseIds.includes(p.courseId));

  // Get unique students
  const studentIds = [...new Set(courseEnrollments.map((_, idx) => String(idx + 1)))];
  const students = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      email: 'student1@lms.edu.vn',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      status: 'active',
    },
    {
      id: '4',
      name: 'Phạm Thị Dung',
      email: 'student2@lms.edu.vn',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      status: 'active',
    },
    {
      id: '5',
      name: 'Hoàng Văn Em',
      email: 'student3@lms.edu.vn',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
      status: 'locked',
    },
  ];

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get student stats
  const getStudentStats = (studentId: string) => {
    const enrollments = mockStudentProgress;
    const avgProgress = enrollments.length > 0
      ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
      : 0;
    return {
      coursesCount: enrollments.length,
      avgProgress: avgProgress,
      completedCourses: enrollments.filter(e => e.progress === 100).length,
    };
  };

  const handleSendReminder = (studentName: string) => {
    Modal.confirm({
      title: 'Gửi nhắc nhở',
      content: `Bạn có muốn gửi email nhắc nhở đến ${studentName}?`,
      okText: 'Gửi',
      cancelText: 'Hủy',
      onOk() {
        Modal.success({
          title: 'Thành công',
          content: `Đã gửi email nhắc nhở đến ${studentName}`,
          okText: 'Đóng',
        });
      },
    });
  };

  const columns = [
    {
      title: 'Sinh viên',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={record.avatar}
            icon={<UserOutlined />}
          />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (text: string) => (
        <span className="text-muted-foreground">{text}</span>
      ),
    },
    {
      title: 'Số khóa học',
      dataIndex: 'id',
      key: 'coursesCount',
      width: 120,
      render: (studentId: string) => {
        const stats = getStudentStats(studentId);
        return (
          <span className="font-medium">{stats.coursesCount}</span>
        );
      },
    },
    {
      title: 'Tiến độ TB',
      dataIndex: 'id',
      key: 'avgProgress',
      width: 150,
      render: (studentId: string) => {
        const stats = getStudentStats(studentId);
        return (
          <div className="flex items-center gap-2">
            <Progress
              percent={stats.avgProgress}
              size="small"
              strokeColor={{
                '0%': '#ef4444',
                '50%': '#f59e0b',
                '100%': '#10b981',
              }}
            />
            <span className="text-sm font-medium w-10">{stats.avgProgress}%</span>
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        if (status === 'locked') {
          return (
            <Tag
              icon={<LockOutlined />}
              color="red"
            >
              Đã khóa
            </Tag>
          );
        }
        return (
          <Tag
            icon={<CheckCircleOutlined />}
            color="green"
          >
            Hoạt động
          </Tag>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      render: (_, record: any) => (
        <Button
          type="link"
          icon={<MailOutlined />}
          onClick={() => handleSendReminder(record.name)}
        >
          Gửi nhắc nhở
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý sinh viên</h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi và quản lý sinh viên trong các khóa học của bạn
          </p>
        </div>

        {/* Stats */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Card className="border-0 shadow-soft">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Tổng sinh viên</p>
                <p className="text-3xl font-bold text-primary">{students.length}</p>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card className="border-0 shadow-soft">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Sinh viên hoạt động</p>
                <p className="text-3xl font-bold text-success">
                  {students.filter(s => s.status === 'active').length}
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card className="border-0 shadow-soft">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Khóa học quản lý</p>
                <p className="text-3xl font-bold text-accent">{teacherCourses.length}</p>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Search */}
        <Card className="border-0 shadow-soft">
          <Input
            placeholder="Tìm kiếm sinh viên theo tên hoặc email..."
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="large"
            allowClear
          />
        </Card>

        {/* Students Table */}
        <Card className="border-0 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Danh sách sinh viên ({filteredStudents.length})
            </h2>
          </div>

          <Table
            columns={columns}
            dataSource={filteredStudents.map((student, idx) => ({
              ...student,
              key: student.id,
            }))}
            pagination={{ pageSize: 10, total: filteredStudents.length }}
            className="ant-table-responsive"
            scroll={{ x: 1000 }}
            locale={{
              emptyText: 'Không tìm thấy sinh viên nào',
            }}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudentsPage;
