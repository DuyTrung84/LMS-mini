import React from 'react';
import { Card, Progress, Row, Col, Statistic, Table, Tag, Empty, Button, Space } from 'antd';
import {
  LineChartOutlined,
  TrophyOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockStudentProgress, mockCourses, mockLessons } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get student's enrolled courses
  const studentProgress = mockStudentProgress;
  const enrolledCourses = mockCourses.filter(c => c.progress !== undefined);

  // Calculate overall statistics
  const totalProgress = studentProgress.length > 0
    ? Math.round(studentProgress.reduce((sum, p) => sum + p.progress, 0) / studentProgress.length)
    : 0;

  const completedCount = studentProgress.filter(p => p.progress === 100).length;
  const totalLessonsCompleted = studentProgress.reduce((sum, p) => sum + p.completedLessons, 0);
  const totalLessonsPlan = studentProgress.reduce((sum, p) => sum + p.totalLessons, 0);

  // Prepare table data
  const tableData = enrolledCourses
    .map(course => {
      const progress = mockStudentProgress.find(p => p.courseId === course.id);
      return {
        key: course.id,
        id: course.id,
        title: course.title,
        thumbnail: course.thumbnail,
        instructor: course.instructor,
        progress: progress?.progress || 0,
        completedLessons: progress?.completedLessons || 0,
        totalLessons: progress?.totalLessons || course.lessons,
        lastAccessed: progress?.lastAccessed || 'Chưa truy cập',
      };
    });

  const columns = [
    {
      title: 'Khóa học',
      dataIndex: 'title',
      key: 'title',
      width: 250,
      render: (text: string, record: any) => (
        <Space direction="vertical" size={0} style={{ width: '100%' }}>
          <div className="flex items-center gap-3">
            <img 
              src={record.thumbnail} 
              alt={text}
              className="w-16 h-12 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-foreground truncate">{text}</p>
              <p className="text-xs text-muted-foreground">{record.instructor}</p>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: 'progress',
      width: 150,
      render: (progress: number) => (
        <div className="flex items-center gap-2">
          <Progress 
            percent={progress} 
            size="small"
            strokeColor={{
              '0%': '#ef4444',
              '50%': '#f59e0b',
              '100%': '#10b981',
            }}
            format={(percent) => `${percent}%`}
          />
        </div>
      ),
    },
    {
      title: 'Bài học',
      dataIndex: 'completedLessons',
      key: 'completedLessons',
      width: 100,
      render: (completedLessons: number, record: any) => (
        <span className="font-medium">
          {completedLessons}/{record.totalLessons}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'progress',
      key: 'status',
      width: 120,
      render: (progress: number) => {
        if (progress === 100) {
          return <Tag color="success" icon={<CheckCircleOutlined />}>Hoàn thành</Tag>;
        } else if (progress > 0) {
          return <Tag color="processing">Đang học ({progress}%)</Tag>;
        } else {
          return <Tag>Chưa bắt đầu</Tag>;
        }
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      render: (text: string, record: any) => (
        <Button 
          type="link" 
          icon={<ArrowRightOutlined />}
          onClick={() => navigate(`/student/courses/${record.id}`)}
        >
          Tiếp tục
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tiến độ học tập</h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi quá trình học tập và tiến độ của bạn
          </p>
        </div>

      {/* Overview Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft h-full">
            <Statistic
              title="Tiến độ tổng thể"
              value={totalProgress}
              suffix="%"
              prefix={<LineChartOutlined className="text-primary" />}
              valueStyle={{ color: 'hsl(var(--primary))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft h-full">
            <Statistic
              title="Khóa học hoàn thành"
              value={completedCount}
              suffix={`/${enrolledCourses.length}`}
              prefix={<TrophyOutlined className="text-success" />}
              valueStyle={{ color: 'hsl(var(--success))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft h-full">
            <Statistic
              title="Bài học hoàn thành"
              value={totalLessonsCompleted}
              suffix={`/${totalLessonsPlan}`}
              prefix={<FileTextOutlined className="text-warning" />}
              valueStyle={{ color: 'hsl(var(--warning))' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="card-hover border-0 shadow-soft h-full">
            <Statistic
              title="Tổng thời gian học"
              value="24"
              suffix=" giờ"
              prefix={<ClockCircleOutlined className="text-accent" />}
              valueStyle={{ color: 'hsl(var(--accent))' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Course Progress Details */}
      <Card className="border-0 shadow-soft">
        <div className="mb-6 flex items-center gap-2">
          <LineChartOutlined className="text-primary text-lg" />
          <h2 className="text-xl font-semibold text-foreground">Chi tiết tiến độ từng khóa học</h2>
        </div>

        {enrolledCourses.length > 0 ? (
          <Table 
            columns={columns} 
            dataSource={tableData}
            pagination={{ pageSize: 10 }}
            className="ant-table-responsive"
            scroll={{ x: 1000 }}
          />
        ) : (
          <Empty 
            description="Bạn chưa đăng ký khóa học nào"
            style={{ paddingTop: 40, paddingBottom: 40 }}
          >
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/courses')}
            >
              Khám phá khóa học
            </Button>
          </Empty>
        )}
      </Card>

      {/* Learning Streak Section */}
      {enrolledCourses.length > 0 && (
        <Card className="border-0 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-success text-lg" />
              <h2 className="text-xl font-semibold text-foreground">Thống kê học tập</h2>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <p className="text-muted-foreground text-sm mb-2">Khóa học đang học</p>
                <p className="text-2xl font-bold text-primary">
                  {enrolledCourses.length - completedCount}
                </p>
                <p className="text-xs text-muted-foreground mt-2">khóa đang tiến hành</p>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <p className="text-muted-foreground text-sm mb-2">Tỉ lệ hoàn thành</p>
                <p className="text-2xl font-bold text-success">
                  {enrolledCourses.length > 0 ? Math.round((completedCount / enrolledCourses.length) * 100) : 0}%
                </p>
                <p className="text-xs text-muted-foreground mt-2">tổng khóa học</p>
              </div>
            </Col>
          </Row>
        </Card>
      )}
      </div>
    </DashboardLayout>
  );
};

export default ProgressPage;
