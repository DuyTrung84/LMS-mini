import React from 'react';
import { Card, Row, Col, Statistic, Table, Progress, Tag } from 'antd';
import {
  BarChartOutlined,
  BookOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockCourses, mockStudentProgress } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp } from 'lucide-react';

interface CourseStats {
  id: string;
  title: string;
  thumbnail: string;
  enrollments: number;
  avgProgress: number;
  completedCount: number;
  completionRate: number;
}

const TeacherStatistics = () => {
  const { user } = useAuth();

  // Filter courses by current teacher (for demo, we'll use all courses)
  const myCourses = mockCourses;

  // Calculate stats for each course
  const courseStats: CourseStats[] = myCourses.map((course) => {
    const courseProgress = mockStudentProgress.filter(
      (p) => p.courseId === course.id
    );

    const avgProgress =
      courseProgress.length > 0
        ? Math.round(
            courseProgress.reduce((sum, p) => sum + p.progress, 0) /
              courseProgress.length
          )
        : 0;

    const completedCount = courseProgress.filter(
      (p) => p.progress === 100
    ).length;

    const completionRate =
      courseProgress.length > 0
        ? Math.round((completedCount / courseProgress.length) * 100)
        : 0;

    return {
      id: course.id,
      title: course.title,
      thumbnail: course.thumbnail,
      enrollments: courseProgress.length,
      avgProgress,
      completedCount,
      completionRate,
    };
  });

  const totalEnrollments = courseStats.reduce(
    (sum, c) => sum + c.enrollments,
    0
  );

  const avgOverallProgress =
    courseStats.length > 0
      ? Math.round(
          courseStats.reduce((sum, c) => sum + c.avgProgress, 0) /
            courseStats.length
        )
      : 0;

  const effectiveCourses = courseStats.filter(
    (c) => c.completionRate > 50
  ).length;

  // Table columns
  const columns = [
    {
      title: 'Khóa học',
      key: 'course',
      width: 300,
      render: (_: any, record: CourseStats) => (
        <div className="flex items-center gap-3">
          <img
            src={record.thumbnail}
            alt={record.title}
            className="w-16 h-12 rounded object-cover"
          />
          <span className="font-medium text-foreground">{record.title}</span>
        </div>
      ),
    },
    {
      title: 'Lượt đăng ký',
      dataIndex: 'enrollments',
      key: 'enrollments',
      width: 120,
      align: 'center' as const,
      render: (count: number) => (
        <Tag color="blue">{count} học viên</Tag>
      ),
    },
    {
      title: 'Hoàn thành',
      key: 'completed',
      width: 120,
      align: 'center' as const,
      render: (_: any, record: CourseStats) => (
        <span className="font-medium">{record.completedCount}</span>
      ),
    },
    {
      title: 'Tiến độ TB',
      key: 'avgProgress',
      width: 150,
      render: (_: any, record: CourseStats) => (
        <div className="flex items-center gap-2">
          <Progress
            type="circle"
            percent={record.avgProgress}
            width={40}
            strokeColor={
              record.avgProgress >= 70
                ? '#22c55e'
                : record.avgProgress >= 40
                ? '#f59e0b'
                : '#ef4444'
            }
          />
          <span className="text-sm">{record.avgProgress}%</span>
        </div>
      ),
    },
    {
      title: 'Tỷ lệ hoàn thành',
      key: 'completionRate',
      width: 150,
      render: (_: any, record: CourseStats) => (
        <div className="flex items-center gap-2">
          <Progress
            type="circle"
            percent={record.completionRate}
            width={40}
            strokeColor={
              record.completionRate >= 70
                ? '#22c55e'
                : record.completionRate >= 40
                ? '#f59e0b'
                : '#ef4444'
            }
          />
          <span className="text-sm">{record.completionRate}%</span>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Thống kê</h1>
          <p className="text-muted-foreground mt-1">
            Phân tích chi tiết về hiệu suất các khóa học
          </p>
        </div>

        {/* Overview Stats */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Khóa học"
                value={myCourses.length}
                prefix={<BookOutlined />}
                valueStyle={{ color: 'hsl(var(--primary))' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Lượt đăng ký"
                value={totalEnrollments}
                prefix={<UserOutlined />}
                valueStyle={{ color: 'hsl(var(--accent))' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Tiến độ TB"
                value={avgOverallProgress}
                suffix="%"
                prefix={<TrendingUp />}
                valueStyle={{ color: 'hsl(var(--success))' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Khóa hiệu quả"
                value={effectiveCourses}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: 'hsl(var(--warning))' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Course Performance Table */}
        <Card className="border-0 shadow-soft" title={<>
          <BarChartOutlined className="mr-2 text-primary" />
          Hiệu suất từng khóa học
        </>}>
          <Table
            columns={columns}
            dataSource={courseStats}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Detailed Breakdown */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card className="border-0 shadow-soft" title="Phân bổ tiến độ">
              <div className="space-y-6">
                {courseStats.slice(0, 3).map((course) => (
                  <div key={course.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{course.title}</span>
                      <span className="text-sm font-semibold">
                        {course.avgProgress}%
                      </span>
                    </div>
                    <Progress
                      percent={course.avgProgress}
                      strokeColor={
                        course.avgProgress >= 70
                          ? '#22c55e'
                          : course.avgProgress >= 40
                          ? '#f59e0b'
                          : '#ef4444'
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="border-0 shadow-soft" title="Tỷ lệ hoàn thành">
              <div className="space-y-6">
                {courseStats.slice(0, 3).map((course) => (
                  <div key={course.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{course.title}</span>
                      <span className="text-sm font-semibold">
                        {course.completionRate}%
                      </span>
                    </div>
                    <Progress
                      percent={course.completionRate}
                      strokeColor={
                        course.completionRate >= 70
                          ? '#22c55e'
                          : course.completionRate >= 40
                          ? '#f59e0b'
                          : '#ef4444'
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStatistics;
