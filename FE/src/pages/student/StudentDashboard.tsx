import React from 'react';
import { Card, Progress, Row, Col, Statistic, List, Avatar, Tag, Button } from 'antd';
import {
  BookOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  RightOutlined,
  PlayCircleOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockStudentProgress, mockCourses, dashboardStats } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stats = dashboardStats.student;

  const enrolledCourses = mockCourses.filter(c => c.progress !== undefined).slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="gradient-hero rounded-xl p-6 text-white">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={16}>
            <h1 className="text-2xl font-bold mb-2">
              Xin chào, {user?.name}! 👋
            </h1>
            <p className="text-white/80 mb-4">
              Tiếp tục học tập để đạt được mục tiêu của bạn. Hôm nay bạn đã học được 2 giờ.
            </p>
            <Button 
              size="large" 
              icon={<PlayCircleOutlined />}
              className="!bg-white !text-primary !border-none hover:!bg-white/90"
            >
              Tiếp tục học
            </Button>
          </Col>
          <Col xs={24} md={8} className="text-center">
            <div className="inline-block">
              <Progress
                type="circle"
                percent={stats.averageProgress}
                size={120}
                strokeColor={{ '0%': '#fff', '100%': '#a7f3d0' }}
                trailColor="rgba(255,255,255,0.2)"
                format={(percent) => (
                  <span className="text-white font-bold text-xl">{percent}%</span>
                )}
              />
              <p className="text-white/80 mt-2">Tiến độ tổng thể</p>
            </div>
          </Col>
        </Row>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Khóa học đã đăng ký"
              value={stats.enrolledCourses}
              prefix={<BookOutlined className="text-primary" />}
              valueStyle={{ color: 'hsl(var(--primary))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Khóa học hoàn thành"
              value={stats.completedCourses}
              prefix={<TrophyOutlined className="text-success" />}
              valueStyle={{ color: 'hsl(var(--success))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Tổng giờ học"
              value={stats.totalHours}
              suffix="giờ"
              prefix={<ClockCircleOutlined className="text-secondary" />}
              valueStyle={{ color: 'hsl(var(--secondary))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft">
            <Statistic
              title="Streak học tập"
              value={7}
              suffix="ngày"
              prefix={<FireOutlined className="text-warning" />}
              valueStyle={{ color: 'hsl(var(--warning))' }}
            />
          </Card>
        </Col>
      </Row>

      {/* My Courses and Progress */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card
            title={
              <span className="text-lg font-semibold">
                <BookOutlined className="mr-2 text-primary" />
                Khóa học của tôi
              </span>
            }
            extra={<a className="text-primary">Xem tất cả</a>}
            className="border-0 shadow-soft"
          >
            <List
              dataSource={enrolledCourses}
              renderItem={(course) => (
                <List.Item
                  className="!border-b !border-border hover:bg-muted/50 rounded-lg cursor-pointer transition-colors -mx-2 px-2"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-20 h-14 rounded-lg object-cover"
                      />
                    }
                    title={
                      <span className="font-medium text-foreground">
                        {course.title}
                      </span>
                    }
                    description={
                      <div className="space-y-2">
                        <span className="text-muted-foreground text-sm">
                          {course.instructor} • {course.duration}
                        </span>
                        <Progress
                          percent={course.progress}
                          size="small"
                          strokeColor="hsl(var(--primary))"
                        />
                      </div>
                    }
                  />
                  <RightOutlined className="text-muted-foreground" />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <span className="text-lg font-semibold">
                <TrophyOutlined className="mr-2 text-warning" />
                Tiến độ học tập
              </span>
            }
            className="border-0 shadow-soft"
          >
            <List
              dataSource={mockStudentProgress}
              renderItem={(item) => (
                <List.Item className="!border-b !border-border">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">
                        {item.courseName}
                      </span>
                      <Tag
                        color={item.progress === 100 ? 'success' : item.progress > 50 ? 'processing' : 'warning'}
                      >
                        {item.progress}%
                      </Tag>
                    </div>
                    <Progress
                      percent={item.progress}
                      showInfo={false}
                      strokeColor={
                        item.progress === 100
                          ? 'hsl(var(--success))'
                          : 'hsl(var(--primary))'
                      }
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>
                        {item.completedLessons}/{item.totalLessons} bài học
                      </span>
                      <span>Truy cập: {item.lastAccessed}</span>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Recommendations */}
      <Card
        title={
          <span className="text-lg font-semibold">
            💡 Gợi ý cho bạn
          </span>
        }
        className="border-0 shadow-soft"
      >
        <div className="bg-primary-light rounded-lg p-4 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h4 className="font-medium text-foreground mb-1">
                Bạn đang chậm tiến độ khóa "Cơ sở dữ liệu MongoDB"
              </h4>
              <p className="text-muted-foreground text-sm">
                Bạn chưa hoàn thành bài học trong 5 ngày qua. Hãy dành ít nhất 30 phút mỗi ngày để theo kịp tiến độ.
              </p>
              <Button type="link" className="!p-0 mt-2">
                Tiếp tục học ngay →
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;
