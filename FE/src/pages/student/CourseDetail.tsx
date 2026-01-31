import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Button,
    Tag,
    Typography,
    Divider,
    List,
    Avatar,
    Progress,
    Breadcrumb,
    Empty
} from 'antd';
import {
    ArrowLeftOutlined,
    PlayCircleOutlined,
    FileTextOutlined,
    QuestionCircleOutlined,
    ClockCircleOutlined,
    UserOutlined,
    StarOutlined,
    CheckCircleFilled,
    LockOutlined
} from '@ant-design/icons';
import { mockCourses, mockLessons, mockStudentProgress } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

const { Title, Text, Paragraph } = Typography;

const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const course = mockCourses.find(c => c.id === id);
    const lessons = mockLessons.filter(l => l.courseId === id);
    const enrollment = mockStudentProgress.find(p => p.courseId === id);

    if (!course) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Empty description="Không tìm thấy khóa học" />
                </div>
            </DashboardLayout>
        );
    }

    const isEnrolled = !!enrollment;

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-fade-in pb-10">
                {/* Breadcrumb & Back */}
                <div className="flex items-center justify-between">
                    <Breadcrumb
                        items={[
                            { title: <a onClick={() => navigate('/courses')}>Khóa học</a> },
                            { title: course.title },
                        ]}
                    />
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/courses')}
                        type="text"
                    >
                        Quay lại
                    </Button>
                </div>

                {/* Hero Section */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 to-transparent p-8 border border-primary/20">
                    <Row gutter={[32, 24]} align="middle">
                        <Col xs={24} md={16}>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <Tag color="blue">{course.category}</Tag>
                                    {course.status === 'draft' && <Tag color="orange">Sắp ra mắt</Tag>}
                                </div>
                                <Title level={1} className="m-0 text-3xl md:text-4xl">
                                    {course.title}
                                </Title>
                                <Paragraph className="text-lg text-muted-foreground max-w-2xl">
                                    {course.description}
                                </Paragraph>
                                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-2">
                                        <UserOutlined className="text-primary" />
                                        <Text strong>{course.instructor}</Text>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <StarOutlined className="text-yellow-500" />
                                        <Text strong>{course.rating}</Text>
                                        <Text type="secondary">(1.2k+ đánh giá)</Text>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <ClockCircleOutlined className="text-primary" />
                                        <Text strong>{course.duration}</Text>
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card className="shadow-xl border-0 overflow-hidden">
                                <div className="relative aspect-video">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <Button
                                            shape="circle"
                                            icon={<PlayCircleOutlined style={{ fontSize: 32 }} />}
                                            size="large"
                                            className="h-16 w-16"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 space-y-4">
                                    {isEnrolled ? (
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm font-medium">
                                                <span>Tiến độ học tập</span>
                                                <span className="text-primary">{enrollment.progress}%</span>
                                            </div>
                                            <Progress percent={enrollment.progress} showInfo={false} strokeColor="#0066cc" />
                                            <Button type="primary" size="large" block icon={<PlayCircleOutlined />}>
                                                Tiếp tục học
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="text-2xl font-bold text-center">Miễn phí</div>
                                            <Button type="primary" size="large" block>
                                                Đăng ký ngay
                                            </Button>
                                            <Text type="secondary" className="block text-center text-xs">
                                                Truy cập vĩnh viễn khóa học này
                                            </Text>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Content Section */}
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        <Card className="shadow-soft border-0 mb-6">
                            <Title level={4} className="mb-6">Nội dung khóa học</Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={lessons}
                                renderItem={(item) => (
                                    <List.Item
                                        className={`px-4 rounded-lg my-1 transition-colors cursor-pointer ${item.completed ? 'bg-success/5' : 'hover:bg-gray-50'}`}
                                        onClick={() => {
                                            if (!isEnrolled && item.order > 1) return;
                                            if (item.type === 'quiz') {
                                                navigate(`/student/course/${id}/quiz/${item.id}`);
                                            } else {
                                                navigate(`/student/course/${id}/lesson/${item.id}`);
                                            }
                                        }}
                                        actions={[
                                            <span key="duration" className="text-xs text-muted-foreground">{item.duration}</span>,
                                            !isEnrolled && item.order > 1 ? <LockOutlined key="lock" /> : null
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    size="small"
                                                    icon={
                                                        item.type === 'video' ? <PlayCircleOutlined /> :
                                                            item.type === 'quiz' ? <QuestionCircleOutlined /> :
                                                                <FileTextOutlined />
                                                    }
                                                    className={item.completed ? 'bg-success' : 'bg-primary'}
                                                />
                                            }
                                            title={
                                                <div className="flex items-center gap-2">
                                                    <span className={item.completed ? 'text-success font-medium' : ''}>
                                                        {item.order}. {item.title}
                                                    </span>
                                                    {item.completed && <CheckCircleFilled className="text-success text-xs" />}
                                                </div>
                                            }
                                            description={
                                                <Tag className="text-[10px] uppercase">{item.type}</Tag>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card className="shadow-soft border-0">
                            <Title level={4} className="mb-4">Thông tin khóa học</Title>
                            <Paragraph className="text-muted-foreground leading-relaxed">
                                Khóa học này được thiết kế để giúp bạn nắm vững nền tảng kiến thức và kỹ năng thực hành
                                về {course.category}. Với lộ trình học tập bài bản, dễ hiểu, bạn sẽ nhanh chóng làm chủ được
                                các công nghệ và công cụ cần thiết.
                            </Paragraph>
                            <Title level={5}>Bạn sẽ học được gì?</Title>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li>Kiến thức nền tảng vững chắc về {course.title}</li>
                                <li>Kỹ năng thực hành thông qua các bài tập và dự án thực tế</li>
                                <li>Cách tối ưu hóa quy trình làm việc và giải quyết vấn đề</li>
                                <li>Kết nối và học hỏi từ cộng đồng học viên</li>
                            </ul>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <div className="sticky top-6 space-y-6">
                            <Card className="shadow-soft border-0">
                                <Title level={5}>Giảng viên</Title>
                                <div className="flex items-center gap-4 mt-4">
                                    <Avatar size={64} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} />
                                    <div>
                                        <Text strong className="block text-lg">{course.instructor}</Text>
                                        <Text type="secondary">Chuyên gia {course.category}</Text>
                                    </div>
                                </div>
                                <Divider />
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <Text type="secondary">Học viên:</Text>
                                        <Text strong>{course.students.toLocaleString()}</Text>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <Text type="secondary">Bài học:</Text>
                                        <Text strong>{course.lessons}</Text>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <Text type="secondary">Review:</Text>
                                        <Text strong>{course.rating} / 5</Text>
                                    </div>
                                </div>
                            </Card>

                            <Card className="shadow-soft border-0 bg-primary/5 border-primary/20">
                                <Title level={5}>Yêu cầu khóa học</Title>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                    <li>Máy tính có kết nối internet</li>
                                    <li>Kiến thức cơ bản về máy tính</li>
                                    <li>Sự kiên trì và ham học hỏi</li>
                                </ul>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </DashboardLayout>
    );
};

export default CourseDetail;
