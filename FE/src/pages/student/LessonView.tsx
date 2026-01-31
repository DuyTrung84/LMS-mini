import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Layout,
    Menu,
    Typography,
    Button,
    Divider,
    Space,
    Tag,
    Card,
    Progress,
    Tooltip
} from 'antd';
import {
    ArrowLeftOutlined,
    PlayCircleOutlined,
    FileTextOutlined,
    QuestionCircleOutlined,
    CheckCircleFilled,
    LeftOutlined,
    RightOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { mockCourses, mockLessons } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

const { Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;

const LessonView: React.FC = () => {
    const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const course = mockCourses.find(c => c.id === courseId);
    const lessons = mockLessons.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order);
    const currentLesson = lessons.find(l => l.id === lessonId) || lessons[0];

    if (!course || !currentLesson) {
        return <div>Loading...</div>;
    }

    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    const handleLessonSelect = (id: string) => {
        const selectedLesson = lessons.find(l => l.id === id);
        if (selectedLesson?.type === 'quiz') {
            navigate(`/student/course/${courseId}/quiz/${id}`);
        } else {
            navigate(`/student/course/${courseId}/lesson/${id}`);
        }
    };

    return (
        <DashboardLayout hideSidebar>
            <Layout className="min-h-[calc(100vh-64px)] bg-white">
                <Content className="p-0 md:p-6 overflow-y-auto">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {/* Header & Back */}
                        <div className="flex items-center justify-between mb-4">
                            <Button
                                icon={<ArrowLeftOutlined />}
                                onClick={() => navigate(`/student/course/${courseId}`)}
                                type="text"
                            >
                                Quay lại khóa học
                            </Button>
                            <div className="hidden md:block">
                                <Text strong className="text-lg">{course.title}</Text>
                            </div>
                            <Button
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                className="lg:hidden"
                            />
                        </div>

                        {/* Video Player Placeholder */}
                        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircleOutlined className="text-6xl text-white/50 group-hover:text-white/80 transition-all cursor-pointer" />
                            </div>
                            {/* In a real app, use an iframe or video tag here */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <Title level={4} className="m-0 text-white font-medium">
                                    {currentLesson.order}. {currentLesson.title}
                                </Title>
                            </div>
                        </div>

                        {/* Lesson Info */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Tag color="blue" className="uppercase">{currentLesson.type}</Tag>
                                        <Text type="secondary">{currentLesson.duration}</Text>
                                    </div>
                                    <Title level={3} className="m-0">{currentLesson.title}</Title>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        disabled={!prevLesson}
                                        icon={<LeftOutlined />}
                                        onClick={() => prevLesson && handleLessonSelect(prevLesson.id)}
                                    >
                                        Bài trước
                                    </Button>
                                    <Button
                                        type="primary"
                                        disabled={!nextLesson}
                                        onClick={() => nextLesson && handleLessonSelect(nextLesson.id)}
                                        className="bg-primary"
                                    >
                                        Bài tiếp theo <RightOutlined />
                                    </Button>
                                </div>
                            </div>

                            <Divider />

                            <div className="prose prose-blue max-w-none">
                                <Title level={4}>Nội dung bài học</Title>
                                <Paragraph className="text-lg text-gray-600 leading-relaxed">
                                    Trong bài học này, chúng ta sẽ tìm hiểu về các khái niệm cơ bản và cách áp dụng thực tế.
                                    Hãy chú ý theo dõi video và ghi chú lại những điểm quan trọng.
                                </Paragraph>
                                <ul className="space-y-2 text-gray-600">
                                    <li>Mục tiêu 1: Hiểu rõ cơ chế hoạt động</li>
                                    <li>Mục tiêu 2: Thực hành xây dựng cấu trúc cơ bản</li>
                                    <li>Mục tiêu 3: Tối ưu hóa hiệu suất</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Content>

                <Sider
                    width={350}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    collapsedWidth={0}
                    className="bg-gray-50 border-l border-gray-200"
                    theme="light"
                >
                    <div className="p-6 h-full flex flex-col">
                        <Title level={5} className="mb-4">Nội dung khóa học</Title>
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <Text size="small" type="secondary">Tiến độ hoàn thành</Text>
                                <Text strong>25%</Text>
                            </div>
                            <Progress percent={25} size="small" strokeColor="#0066cc" />
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <Menu
                                mode="inline"
                                selectedKeys={[currentLesson.id]}
                                className="bg-transparent border-0"
                                items={lessons.map(lesson => ({
                                    key: lesson.id,
                                    onClick: () => handleLessonSelect(lesson.id),
                                    icon: lesson.completed ?
                                        <CheckCircleFilled className="text-success" /> :
                                        (lesson.type === 'video' ? <PlayCircleOutlined /> : <QuestionCircleOutlined />),
                                    label: (
                                        <div className="flex flex-col py-2">
                                            <Text className={lesson.id === currentLesson.id ? 'font-medium' : ''}>
                                                {lesson.order}. {lesson.title}
                                            </Text>
                                            <Text type="secondary" className="text-[10px] mt-[-4px]">
                                                {lesson.duration}
                                            </Text>
                                        </div>
                                    ),
                                    className: `mb-1 rounded-lg ${lesson.id === currentLesson.id ? 'bg-primary/5' : ''}`
                                }))}
                            />
                        </div>
                    </div>
                </Sider>
            </Layout>
        </DashboardLayout>
    );
};

export default LessonView;
