import React, { useState } from 'react';
import { Card, Row, Col, Input, Select, Tag, Button, Empty, Space, Rate, Badge } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  StarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockStudentProgress, mockCourses } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';

const categories = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Lập trình', value: 'Lập trình' },
  { label: 'Backend', value: 'Backend' },
  { label: 'Cơ sở dữ liệu', value: 'Cơ sở dữ liệu' },
  { label: 'Thiết kế', value: 'Thiết kế' },
  { label: 'AI/ML', value: 'AI/ML' },
];

const CoursesPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get enrolled courses
  const enrolledCourseIds = mockStudentProgress.map(p => p.courseId);

  // Filter courses
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const CourseCard = ({ course }: { course: typeof mockCourses[0] }) => {
    const isEnrolled = enrolledCourseIds.includes(course.id);
    const enrollment = mockStudentProgress.find(p => p.courseId === course.id);

    return (
      <Card 
        className="card-hover border-0 shadow-soft h-full overflow-hidden transition-all duration-300"
        cover={
          <div className="relative overflow-hidden bg-gray-100 h-40 group">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button 
                type="primary" 
                size="large"
                icon={isEnrolled ? <PlayCircleOutlined /> : <CheckCircleOutlined />}
                onClick={() => {
                  if (isEnrolled) {
                    navigate(`/student/course/${course.id}`);
                  } else {
                    navigate(`/student/course/${course.id}`);
                  }
                }}
              >
                {isEnrolled ? 'Tiếp tục học' : 'Đăng ký'}
              </Button>
            </div>
            {course.status === 'draft' && (
              <div className="absolute top-2 left-2">
                <Tag color="orange">Sắp ra mắt</Tag>
              </div>
            )}
            {isEnrolled && enrollment && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50">
                <div className="p-2">
                  <div className="flex items-center justify-between text-white text-xs mb-1">
                    <span>Tiến độ: {enrollment.progress}%</span>
                  </div>
                </div>
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

          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <StarOutlined /> Đánh giá
              </span>
              <Rate value={Math.round(course.rating)} disabled size="small" /> 
              <span className="font-semibold">{course.rating}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileTextOutlined /> Bài học
              </span>
              <span>{course.lessons}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1">
                <ClockCircleOutlined /> Thời gian
              </span>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1">
                <UserOutlined /> Học viên
              </span>
              <span>{course.students}</span>
            </div>
          </div>

          {isEnrolled && enrollment && (
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-muted-foreground">Tiến độ:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-300"
                    style={{ width: `${enrollment.progress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-success">{enrollment.progress}%</span>
              </div>
              <Button 
                type="primary" 
                block 
                icon={<PlayCircleOutlined />}
                onClick={() => navigate(`/student/course/${course.id}`)}
              >
                Tiếp tục học
              </Button>
            </div>
          )}

          {!isEnrolled && (
            <Button 
              type="primary" 
              block 
              icon={<CheckCircleOutlined />}
              onClick={() => navigate(`/student/course/${course.id}`)}
            >
              Đăng ký khóa học
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Khám phá khóa học</h1>
          <p className="text-muted-foreground mt-1">
            Tìm kiếm và đăng ký các khóa học phù hợp với bạn
          </p>
        </div>

        {/* Filters */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Input
              placeholder="Tìm kiếm khóa học..."
              prefix={<SearchOutlined />}
              size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Chọn danh mục"
              size="large"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
            />
          </Col>
          <Col xs={24} sm={12} lg={18}>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tìm thấy:</span>
              <Badge count={filteredCourses.length} color="blue" />
              <span className="text-sm font-medium">{filteredCourses.length} khóa học</span>
            </div>
          </Col>
        </Row>

        {/* Active Filters */}
        {selectedCategory !== 'all' && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Bộ lọc:</span>
            <Tag 
              closable 
              onClose={() => setSelectedCategory('all')}
              color="blue"
              icon={<FilterOutlined />}
            >
              {categories.find(c => c.value === selectedCategory)?.label}
            </Tag>
          </div>
        )}

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <Row gutter={[16, 16]}>
            {filteredCourses.map(course => (
              <Col key={course.id} xs={24} sm={12} lg={8}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="border-0 shadow-soft">
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không tìm thấy khóa học nào"
              style={{ paddingTop: 40, paddingBottom: 40 }}
            >
              <Button 
                type="primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Xóa bộ lọc
              </Button>
            </Empty>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CoursesPage;
