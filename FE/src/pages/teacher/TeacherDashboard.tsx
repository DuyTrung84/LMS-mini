import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Progress, Avatar, List } from 'antd';
import {
  BookOutlined,
  TeamOutlined,
  StarOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  RiseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockCourses, dashboardStats } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stats = dashboardStats.teacher;

  const myCourses = mockCourses.filter(c => c.instructor === 'Trần Thị Bình');

  const columns = [
    {
      title: 'Khóa học',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: typeof mockCourses[0]) => (
        <div className="flex items-center gap-3">
          <img
            src={record.thumbnail}
            alt={text}
            className="w-16 h-10 rounded object-cover"
          />
          <div>
            <div className="font-medium text-foreground">{text}</div>
            <div className="text-xs text-muted-foreground">{record.category}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Sinh viên',
      dataIndex: 'students',
      key: 'students',
      render: (value: number) => (
        <span className="font-medium">{value.toLocaleString()}</span>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <StarOutlined className="text-warning" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : status === 'draft' ? 'warning' : 'default'}>
          {status === 'active' ? 'Hoạt động' : status === 'draft' ? 'Nháp' : 'Lưu trữ'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: typeof mockCourses[0]) => (
        <div className="flex gap-2">
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
        </div>
      ),
    },
  ];

  const recentStudents = [
    { name: 'Nguyễn Văn An', course: 'Lập trình Web với React', progress: 75, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
    { name: 'Phạm Thị Dung', course: 'API với .NET 8', progress: 45, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4' },
    { name: 'Lê Văn Hải', course: 'Lập trình Web với React', progress: 90, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="gradient-hero rounded-xl p-6 text-white">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={18}>
            <h1 className="text-2xl font-bold mb-2">
              Chào buổi sáng, {user?.name}! 👨‍🏫
            </h1>
            <p className="text-white/80 mb-4">
              Bạn có 15 sinh viên mới đăng ký tuần này. Hãy kiểm tra tiến độ của họ!
            </p>
            <Button
              size="large"
              icon={<PlusOutlined />}
              className="!bg-white !text-primary !border-none hover:!bg-white/90"
              onClick={() => navigate('/manage-courses')}
            >
              Tạo khóa học mới
            </Button>
          </Col>
          <Col xs={24} md={6} className="text-right">
            <RiseOutlined className="text-6xl text-white/30" />
          </Col>
        </Row>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Tổng khóa học"
              value={stats.totalCourses}
              prefix={<BookOutlined className="text-primary" />}
              valueStyle={{ color: 'hsl(var(--primary))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Khóa học hoạt động"
              value={stats.activeCourses}
              prefix={<BookOutlined className="text-success" />}
              valueStyle={{ color: 'hsl(var(--success))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Tổng sinh viên"
              value={stats.totalStudents}
              prefix={<TeamOutlined className="text-secondary" />}
              valueStyle={{ color: 'hsl(var(--secondary))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Đánh giá trung bình"
              value={stats.averageRating}
              precision={1}
              prefix={<StarOutlined className="text-warning" />}
              valueStyle={{ color: 'hsl(var(--warning))' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Courses Table and Recent Students */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <span className="text-lg font-semibold">
                <BookOutlined className="mr-2 text-primary" />
                Khóa học của tôi
              </span>
            }
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/manage-courses')}>
                Tạo mới
              </Button>
            }
            className="border-0 shadow-soft"
          >
            <Table
              dataSource={myCourses}
              columns={columns}
              rowKey="id"
              pagination={false}
              className="overflow-x-auto"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <span className="text-lg font-semibold">
                <TeamOutlined className="mr-2 text-secondary" />
                Sinh viên gần đây
              </span>
            }
            className="border-0 shadow-soft"
          >
            <List
              dataSource={recentStudents}
              renderItem={(student) => (
                <List.Item className="!border-b !border-border">
                  <List.Item.Meta
                    avatar={<Avatar src={student.avatar} icon={<UserOutlined />} />}
                    title={<span className="font-medium">{student.name}</span>}
                    description={
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          {student.course}
                        </div>
                        <Progress
                          percent={student.progress}
                          size="small"
                          strokeColor="hsl(var(--primary))"
                        />
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Stats Chart Placeholder */}
      <Card
        title={
          <span className="text-lg font-semibold">
            📊 Thống kê đăng ký theo tháng
          </span>
        }
        className="border-0 shadow-soft"
      >
        <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="text-center text-muted-foreground">
            <RiseOutlined className="text-4xl mb-2" />
            <p>Biểu đồ thống kê sẽ được hiển thị ở đây</p>
            <p className="text-sm">Tích hợp với @ant-design/charts</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
