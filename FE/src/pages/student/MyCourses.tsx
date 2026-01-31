import React from 'react';
import { Card, Row, Col, Tabs, Progress, Tag, Button, Empty, Space, Rate, Badge } from 'antd';
import {
  BookOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockStudentProgress, mockCourses } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface CourseWithProgress {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  duration: string;
  lessons: number;
  rating: number;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: string;
}

const MyCoursesPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get user's enrolled courses
  const enrolledCourses: CourseWithProgress[] = mockStudentProgress.map(progress => {
    const course = mockCourses.find(c => c.id === progress.courseId);
    return {
      ...course!,
      progress: progress.progress,
      completedLessons: progress.completedLessons,
      totalLessons: progress.totalLessons,
      lastAccessed: progress.lastAccessed,
    };
  });

  // Filter courses by status
  const inProgressCourses = enrolledCourses.filter(
    course => course.progress > 0 && course.progress < 100
  );

  const completedCourses = enrolledCourses.filter(
    course => course.progress === 100
  );

  const notStartedCourses = enrolledCourses.filter(
    course => course.progress === 0
  );

  const CourseCard = ({ course }: { course: CourseWithProgress }) => (
    <Card 
      className="card-hover border-0 shadow-soft h-full overflow-hidden"
      cover={
        <div className="relative overflow-hidden bg-gray-100 h-40">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {course.progress === 100 && (
            <div className="absolute top-2 right-2 bg-success text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <CheckCircleOutlined /> Hoàn thành
            </div>
          )}
          {course.progress > 0 && course.progress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50">
              <Progress 
                percent={course.progress} 
                strokeColor="#22c55e"
                trailColor="rgba(255,255,255,0.3)"
                size="small"
                showInfo={false}
                className="!mb-0"
              />
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-3">
        <div>
          <Tag color="blue" className="mb-2">{course.category}</Tag>
          <h3 className="font-semibold text-base line-clamp-2 text-foreground">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{course.instructor}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tiến độ:</span>
            <span className="font-semibold text-primary">{course.progress}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Bài học:</span>
            <span className="font-semibold">
              {course.completedLessons}/{course.totalLessons}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Đánh giá:</span>
            <Rate value={Math.round(course.rating)} disabled size="small" />
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <Button 
            type="primary" 
            block 
            icon={<PlayCircleOutlined />}
            onClick={() => navigate(`/student/course/${course.id}`)}
          >
            Tiếp tục học
          </Button>
        </div>
      </div>
    </Card>
  );

  const EmptyState = () => (
    <Empty 
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Chưa có khóa học nào"
      style={{ paddingTop: 40, paddingBottom: 40 }}
    >
      <Button 
        type="primary" 
        size="large"
        icon={<BookOutlined />}
        onClick={() => navigate('/student/courses')}
      >
        Khám phá khóa học
      </Button>
    </Empty>
  );

  const CourseGrid = ({ courses }: { courses: CourseWithProgress[] }) => (
    courses.length > 0 ? (
      <Row gutter={[16, 16]}>
        {courses.map(course => (
          <Col key={course.id} xs={24} sm={12} lg={8}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    ) : <EmptyState />
  );

  const tabItems = [
    {
      key: 'all',
      label: (
        <>
          <BookOutlined /> Tất cả ({enrolledCourses.length})
        </>
      ),
      children: <CourseGrid courses={enrolledCourses} />,
    },
    {
      key: 'in-progress',
      label: (
        <>
          <PlayCircleOutlined /> Đang học ({inProgressCourses.length})
        </>
      ),
      children: <CourseGrid courses={inProgressCourses} />,
    },
    {
      key: 'completed',
      label: (
        <>
          <CheckCircleOutlined /> Hoàn thành ({completedCourses.length})
        </>
      ),
      children: <CourseGrid courses={completedCourses} />,
    },
    {
      key: 'not-started',
      label: (
        <>
          <FileTextOutlined /> Chưa bắt đầu ({notStartedCourses.length})
        </>
      ),
      children: <CourseGrid courses={notStartedCourses} />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Khóa học của tôi</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý và theo dõi các khóa học bạn đã đăng ký
          </p>
        </div>

        {/* Tabs */}
        <Card className="border-0 shadow-soft">
          <Tabs items={tabItems} defaultActiveKey="all" />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyCoursesPage;
