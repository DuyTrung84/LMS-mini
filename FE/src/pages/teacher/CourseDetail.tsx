import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Table, Modal, Form, Input, message, Space, Tag, Typography, Select } from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    PlayCircleOutlined,
    ClockCircleOutlined,
    VideoCameraOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiFetch } from '@/lib/api';
import ReactPlayer from 'react-player';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Video {
    id?: string;
    title?: string;
    url: string;
    duration?: number;
}

interface Lesson {
    id: string;
    title: string;
    content?: string;
    videos?: Video[]; // Multiple videos
    duration?: number; // Total duration
    typeField?: string;
    createdAt?: string;
    videoUrl?: string; // Standard field for backward compatibility or single video usage
}

interface Course {
    id: string;
    title: string;
    description?: string;
    lessons?: Lesson[];
}

const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state for Lessons
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [form] = Form.useForm();

    // Multiple Video Logic
    const [lessonVideos, setLessonVideos] = useState<Video[]>([]);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [isAddingVideo, setIsAddingVideo] = useState(false);

    // Quiz State
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [currentLessonForQuiz, setCurrentLessonForQuiz] = useState<Lesson | null>(null);
    const [currentQuiz, setCurrentQuiz] = useState<any | null>(null);
    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [questionForm] = Form.useForm();

    useEffect(() => {
        if (id === '1') {
            message.warning('Đây là khóa học mẫu (Demo). Vui lòng tạo khóa học mới để sử dụng đầy đủ tính năng.');
            navigate('/manage-courses');
            return;
        }
        fetchCourseDetail();
    }, [id]);

    const fetchCourseDetail = async () => {
        try {
            setLoading(true);
            const [courseData, lessonsData] = await Promise.all([
                apiFetch<Course>(`/courses/${id}`),
                apiFetch<Lesson[]>(`/courses/${id}/lessons`)
            ]);

            if (courseData) {
                setCourse(courseData);
            }
            if (Array.isArray(lessonsData)) {
                // Fetch videos for each lesson
                const lessonsWithVideos = await Promise.all(lessonsData.map(async (lesson) => {
                    try {
                        const videos = await apiFetch<Video[]>(`/videos?lessonId=${lesson.id}`);
                        return { ...lesson, videos: Array.isArray(videos) ? videos : [] };
                    } catch (e) {
                        // If video fetch fails, check if videoUrl exists and wrap it as a video
                        if (lesson.videoUrl) {
                            return { ...lesson, videos: [{ url: lesson.videoUrl, duration: lesson.duration }] }
                        }
                        return { ...lesson, videos: [] };
                    }
                }));
                setLessons(lessonsWithVideos);
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
            message.error('Không thể tải thông tin khóa học');
            navigate('/manage-courses');
        } finally {
            setLoading(false);
        }
    };

    // Duration Helper
    const formatDuration = (seconds?: number) => {
        if (!seconds) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Lesson Actions
    const handleAdd = () => {
        setEditingLesson(null);
        setLessonVideos([]);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record: Lesson) => {
        setEditingLesson(record);
        // Load videos from record
        setLessonVideos(record.videos || []);
        // Handle legacy videoUrl
        if ((!record.videos || record.videos.length === 0) && record.videoUrl) {
            setLessonVideos([{ url: record.videoUrl, duration: record.duration, title: 'Video chính' }]);
        }

        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleDelete = (lessonId: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa bài học này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            okButtonProps: { danger: true },
            onOk: async () => {
                try {
                    await apiFetch(`/lessons/${lessonId}`, { method: 'DELETE' });
                    setLessons(lessons.filter(l => l.id !== lessonId));
                    message.success('Đã xóa bài học');
                } catch (error) {
                    message.error('Lỗi khi xóa bài học');
                }
            },
        });
    };

    // Video Handling
    const handleAddVideoUrl = () => {
        if (!newVideoUrl) return;
        // Validation logic here?
        setLessonVideos([...lessonVideos, { url: newVideoUrl, title: `Video ${lessonVideos.length + 1}`, duration: 0 }]);
        setNewVideoUrl('');
    };

    const handleRemoveVideo = (index: number) => {
        const newVideos = [...lessonVideos];
        newVideos.splice(index, 1);
        setLessonVideos(newVideos);
    };

    const handleVideoDuration = (index: number, duration: number) => {
        setLessonVideos(prev => {
            const next = [...prev];
            if (next[index]) {
                next[index].duration = duration;
            }
            return next;
        });
    };

    const getTotalDuration = () => {
        return lessonVideos.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            const totalDuration = getTotalDuration();

            // Construct payload with Nested Writes for videos
            // We use 'deleteMany: {}' to clear old videos and 'create: [...]' to add new ones
            // This ensures the list exactly matches what is in the UI

            const videosPayload = {
                deleteMany: {},
                create: lessonVideos.map(v => ({
                    title: v.title || v.url,
                    url: v.url,
                    duration: v.duration || 0
                }))
            };

            const lessonData = {
                title: values.title,
                content: values.content,
                typeField: values.typeField,
                duration: totalDuration,
                course: { id: id },
                videos: videosPayload
            };

            if (editingLesson) {
                // Update
                const updated = await apiFetch<Lesson>(`/lessons/${editingLesson.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(lessonData)
                });
                // We need to fetch the updated lesson with videos to update state correctly
                // or just rely on the fact that we sent the videos.
                // Simpler: reload or construct the new state manually.

                // But since we used 'deleteMany', the IDs of videos changed. 
                // Best to fetchCourseDetail() or wait for it.
                message.success('Cập nhật bài học thành công');
            } else {
                // Create
                const created = await apiFetch<Lesson>(`/lessons`, {
                    method: 'POST',
                    body: JSON.stringify(lessonData)
                });
                message.success('Thêm bài học thành công');
            }

            // Refresh all
            setEditingLesson(null);
            setLessonVideos([]);
            setIsModalOpen(false);
            fetchCourseDetail();

        } catch (error) {
            console.error('Save error:', error);
            message.error('Có lỗi xảy ra khi lưu bài học');
        }
    };

    // Quiz Actions 
    // ... (Keep existing quiz actions: handleManageQuiz, etc.) - RE-INSERT CODE HERE
    const handleManageQuiz = async (lesson: Lesson) => {
        setCurrentLessonForQuiz(lesson);
        setIsQuizModalOpen(true);
        setIsAddingQuestion(false);
        setQuizQuestions([]);
        setCurrentQuiz(null);

        // Fetch Quiz
        try {
            const quizzes = await apiFetch<any[]>(`/quizzes?lessonId=${lesson.id}`);
            if (quizzes && quizzes.length > 0) {
                const quiz = quizzes[0];
                setCurrentQuiz(quiz);
                // Fetch Questions
                const questions = await apiFetch<any[]>(`/questions?quizId=${quiz.id}`);
                setQuizQuestions(questions || []);
            }
        } catch (error) {
            console.error("Error fetching quiz", error);
        }
    };

    const handleCreateQuiz = async () => {
        if (!currentLessonForQuiz) return;
        try {
            const realQuiz = await apiFetch<any>('/quizzes', {
                method: 'POST',
                body: JSON.stringify({
                    title: `Bài tập: ${currentLessonForQuiz.title}`,
                    lesson: { id: currentLessonForQuiz.id }
                })
            });
            setCurrentQuiz(realQuiz);
            message.success("Đã tạo bài tập mới");
        } catch (error) {
            message.error("Lỗi tạo bài tập");
            console.error(error);
        }
    };

    const handleAddQuestion = async () => {
        try {
            const values = await questionForm.validateFields();
            if (!currentQuiz) return;

            const questionData = {
                content: values.content,
                options: [values.optionA, values.optionB, values.optionC, values.optionD],
                correctAnswer: values.correctAnswer, // 0-3
                quiz: { id: currentQuiz.id }
            };

            const created = await apiFetch<any>('/questions', {
                method: 'POST',
                body: JSON.stringify(questionData)
            });

            setQuizQuestions([...quizQuestions, created]);
            setIsAddingQuestion(false);
            questionForm.resetFields();
            message.success("Đã thêm câu hỏi");
        } catch (error) {
            message.error("Lỗi thêm câu hỏi");
        }
    };

    const handleDeleteQuestion = async (qId: string) => {
        try {
            await apiFetch(`/questions/${qId}`, { method: 'DELETE' });
            setQuizQuestions(quizQuestions.filter(q => q.id !== qId));
            message.success("Đã xóa câu hỏi");
        } catch (e) {
            message.error("Lỗi xóa câu hỏi");
        }
    };

    const columns = [
        {
            title: 'Bài học',
            key: 'title',
            render: (_: any, record: Lesson, index: number) => (
                <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
                        <VideoCameraOutlined />
                    </div>
                    <div>
                        <div className="font-semibold">Bài {index + 1}: {record.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {record.typeField || 'Video'} • {record.videos?.length || 0} videos • {formatDuration(record.duration || 0)}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 200,
            render: (_: any, record: Lesson) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} title="Sửa bài học" />
                    <Button
                        type="text"
                        icon={<FileTextOutlined className="text-orange-500" />}
                        onClick={() => handleManageQuiz(record)}
                        title="Quản lý bài tập"
                    />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} title="Xóa" />
                </Space>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <div className="animate-fade-in space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/manage-courses')} />
                    <div>
                        <h1 className="text-2xl font-bold">{course?.title || 'Đang tải...'}</h1>
                        <p className="text-gray-500">Quản lý nội dung và bài học</p>
                    </div>
                    <div className="ml-auto">
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Thêm bài học</Button>
                    </div>
                </div>

                <Card className="shadow-sm border-0">
                    <Table
                        dataSource={lessons}
                        columns={columns}
                        rowKey="id"
                        loading={loading}
                        pagination={false}
                        locale={{ emptyText: 'Chưa có bài học nào. Hãy thêm bài đầu tiên!' }}
                    />
                </Card>

                {/* Lesson Edit/Add Modal */}
                <Modal
                    title={editingLesson ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
                    open={isModalOpen}
                    onOk={handleModalOk}
                    onCancel={() => setIsModalOpen(false)}
                    width={800} // Widen for video list
                    confirmLoading={false}
                >
                    <Form form={form} layout="vertical" className="mt-4">
                        <Form.Item name="title" label="Tiêu đề bài học" rules={[{ required: true }]}>
                            <Input placeholder="Ví dụ: Giới thiệu tổng quan..." />
                        </Form.Item>

                        {/* Multiple Video Section */}
                        <div className="mb-4 border p-4 rounded-lg bg-gray-50">
                            <h4 className="font-medium mb-3">Danh sách Video</h4>
                            <div className="flex gap-2 mb-3">
                                <Input
                                    placeholder="Dán link YouTube vào đây..."
                                    value={newVideoUrl}
                                    onChange={(e) => setNewVideoUrl(e.target.value)}
                                />
                                <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddVideoUrl}>Thêm</Button>
                            </div>

                            <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                {lessonVideos.map((video, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <PlayCircleOutlined className="text-blue-500" />
                                            <div className="truncate max-w-[400px]" title={video.url}>
                                                {video.title || video.url}
                                            </div>
                                            <Tag>{formatDuration(video.duration)}</Tag>
                                        </div>
                                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleRemoveVideo(idx)} />

                                        {/* Hidden Player for Metadata */}
                                        <div style={{ position: 'absolute', width: '0px', height: '0px', opacity: 0, overflow: 'hidden' }}>
                                            <ReactPlayer
                                                url={video.url}
                                                muted={true}
                                                playing={false}
                                                onDuration={(d) => handleVideoDuration(idx, d)}
                                                config={{ youtube: { playerVars: { origin: window.location.origin } } }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {lessonVideos.length === 0 && <p className="text-gray-400 text-center text-sm">Chưa có video nào. Hãy thêm ít nhất 1 video.</p>}
                            </div>
                            <div className="mt-2 text-right text-gray-500 text-sm">
                                Tổng thời lượng: <span className="font-semibold text-black">{formatDuration(getTotalDuration())}</span>
                            </div>
                        </div>


                        <Form.Item name="content" label="Mô tả / Nội dung">
                            <TextArea rows={3} />
                        </Form.Item>
                        <Form.Item name="duration" hidden><Input /></Form.Item>
                    </Form>
                </Modal>

                {/* Quiz Modal */}
                <Modal
                    title={`Bài tập: ${currentLessonForQuiz?.title || ''}`}
                    open={isQuizModalOpen}
                    onCancel={() => setIsQuizModalOpen(false)}
                    footer={null}
                    width={800}
                >
                    {!currentQuiz ? (
                        <div className="text-center py-8">
                            <FileTextOutlined className="text-4xl text-gray-300 mb-4" />
                            <p className="text-gray-500 mb-4">Bài học này chưa có bài tập nào.</p>
                            <Button type="primary" onClick={handleCreateQuiz}>Tạo bài tập ngay</Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{currentQuiz.title}</h3>
                                    <p className="text-gray-500 text-sm">{quizQuestions.length} câu hỏi</p>
                                </div>
                                <Button type="dashed" onClick={() => setIsAddingQuestion(!isAddingQuestion)} icon={<PlusOutlined />}>
                                    {isAddingQuestion ? 'Hủy thêm' : 'Thêm câu hỏi'}
                                </Button>
                            </div>

                            {/* Add Question Form */}
                            {isAddingQuestion && (
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <h4 className="font-medium mb-3">Thêm câu hỏi mới</h4>
                                    <Form form={questionForm} layout="vertical" onFinish={handleAddQuestion}>
                                        <Form.Item name="content" label="Nội dung câu hỏi" rules={[{ required: true }]}>
                                            <TextArea rows={2} placeholder="Nhập câu hỏi..." />
                                        </Form.Item>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Form.Item name="optionA" label="Đáp án A" rules={[{ required: true }]}><Input prefix="A" /></Form.Item>
                                            <Form.Item name="optionB" label="Đáp án B" rules={[{ required: true }]}><Input prefix="B" /></Form.Item>
                                            <Form.Item name="optionC" label="Đáp án C" rules={[{ required: true }]}><Input prefix="C" /></Form.Item>
                                            <Form.Item name="optionD" label="Đáp án D" rules={[{ required: true }]}><Input prefix="D" /></Form.Item>
                                        </div>
                                        <Form.Item name="correctAnswer" label="Đáp án đúng" rules={[{ required: true }]}>
                                            <Select>
                                                <Select.Option value={0}>Đáp án A</Select.Option>
                                                <Select.Option value={1}>Đáp án B</Select.Option>
                                                <Select.Option value={2}>Đáp án C</Select.Option>
                                                <Select.Option value={3}>Đáp án D</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit" block>Lưu câu hỏi</Button>
                                    </Form>
                                </div>
                            )}

                            {/* Questions List */}
                            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                {quizQuestions.length === 0 && !isAddingQuestion && (
                                    <p className="text-center text-gray-500 py-4">Chưa có câu hỏi nào.</p>
                                )}
                                {quizQuestions.map((q, idx) => (
                                    <div key={q.id} className="border p-4 rounded-lg relative hover:shadow-sm">
                                        <div className="absolute top-4 right-4 text-red-500 cursor-pointer" onClick={() => handleDeleteQuestion(q.id)}>
                                            <DeleteOutlined />
                                        </div>
                                        <p className="font-semibold mb-2">Câu {idx + 1}: {q.content}</p>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            {q.options?.map((opt: string, i: number) => (
                                                <div key={i} className={`p-2 rounded ${currentQuiz ? (q.correctAnswer === i ? 'bg-green-100 text-green-700 font-medium' : 'bg-gray-50') : ''}`}>
                                                    {String.fromCharCode(65 + i)}. {opt}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default CourseDetail;
