import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Layout,
    Typography,
    Button,
    Radio,
    Space,
    Card,
    Progress,
    Steps,
    Result,
    Divider,
    Tag
} from 'antd';
import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    RightOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import { mockCourses, mockLessons } from '@/data/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const mockQuizQuestions = [
    {
        id: '1',
        question: 'React là gì?',
        options: [
            'Một thư viện JavaScript để xây dựng giao diện người dùng',
            'Một ngôn ngữ lập trình mới',
            'Một hệ quản trị cơ sở dữ liệu',
            'Một công cụ thiết kế đồ họa'
        ],
        correctAnswer: 0
    },
    {
        id: '2',
        question: 'JSX là viết tắt của cụm từ nào?',
        options: [
            'JavaScript XML',
            'Java Standard Extension',
            'JSON Syntax Extension',
            'JavaScript Extended'
        ],
        correctAnswer: 0
    },
    {
        id: '3',
        question: 'Hook nào được sử dụng để quản lý state trong Functional Component?',
        options: [
            'useEffect',
            'useState',
            'useContext',
            'useReducer'
        ],
        correctAnswer: 1
    }
];

const QuizView: React.FC = () => {
    const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const course = mockCourses.find(c => c.id === courseId);
    const quiz = mockLessons.find(l => l.id === quizId);

    if (!course || !quiz) {
        return <div>Loading...</div>;
    }

    const handleAnswer = (optionIndex: number) => {
        setAnswers({
            ...answers,
            [currentStep]: optionIndex
        });
    };

    const handleNext = () => {
        if (currentStep < mockQuizQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsSubmitted(true);
        }
    };

    const calculateScore = () => {
        let correctCount = 0;
        mockQuizQuestions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correctCount++;
            }
        });
        return {
            score: Math.round((correctCount / mockQuizQuestions.length) * 100),
            correct: correctCount,
            total: mockQuizQuestions.length
        };
    };

    const result = isSubmitted ? calculateScore() : null;

    if (isSubmitted && result) {
        return (
            <DashboardLayout>
                <div className="max-w-3xl mx-auto py-12">
                    <Card className="shadow-xl border-0 text-center p-8">
                        <Result
                            status={result.score >= 50 ? "success" : "warning"}
                            title={result.score >= 50 ? "Chúc mừng! Bạn đã hoàn thành bài tập" : "Cố gắng lên! Bạn cần luyện tập thêm"}
                            subTitle={`Bạn đã trả lời đúng ${result.correct}/${result.total} câu hỏi. Điểm của bạn là ${result.score}/100.`}
                            extra={[
                                <Button type="primary" key="back" size="large" onClick={() => navigate(`/student/course/${courseId}`)}>
                                    Quay lại khóa học
                                </Button>,
                                <Button key="retry" size="large" icon={<ReloadOutlined />} onClick={() => {
                                    setIsSubmitted(false);
                                    setCurrentStep(0);
                                    setAnswers({});
                                }}>
                                    Làm lại
                                </Button>
                            ]}
                        />
                    </Card>
                </div>
            </DashboardLayout>
        );
    }

    const currentQuestion = mockQuizQuestions[currentStep];

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate(`/student/course/${courseId}`)}
                            type="text"
                            className="p-0 h-auto hover:bg-transparent"
                        >
                            Quay lại khóa học
                        </Button>
                        <Title level={2} className="m-0">{quiz.title}</Title>
                        <Text type="secondary">{course.title}</Text>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <ClockCircleOutlined />
                            <span>15:00</span>
                        </div>
                        <Text type="secondary" className="text-xs">Thời gian còn lại</Text>
                    </div>
                </div>

                {/* Progress */}
                <Card className="shadow-soft border-0">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <Text strong>Tiến độ: {currentStep + 1}/{mockQuizQuestions.length}</Text>
                            <Text type="secondary">{Math.round(((currentStep + 1) / mockQuizQuestions.length) * 100)}%</Text>
                        </div>
                        <Progress
                            percent={Math.round(((currentStep + 1) / mockQuizQuestions.length) * 100)}
                            showInfo={false}
                            strokeColor="#0066cc"
                        />
                        <Steps
                            size="small"
                            current={currentStep}
                            items={mockQuizQuestions.map((_, i) => ({ title: `Câu ${i + 1}` }))}
                            className="overflow-x-auto pb-2"
                        />
                    </div>
                </Card>

                {/* Question Area */}
                <Card className="shadow-xl border-0 overflow-hidden">
                    <div className="p-8 space-y-8">
                        <div className="space-y-4">
                            <Tag color="blue" className="px-3 py-1 text-sm font-medium">CÂU HỎI {currentStep + 1}</Tag>
                            <Title level={3} className="m-0 leading-tight">
                                {currentQuestion.question}
                            </Title>
                        </div>

                        <Divider className="m-0" />

                        <Radio.Group
                            className="w-full"
                            value={answers[currentStep]}
                            onChange={(e) => handleAnswer(e.target.value)}
                        >
                            <Space direction="vertical" className="w-full" size="middle">
                                {currentQuestion.options.map((option, index) => (
                                    <Radio
                                        key={index}
                                        value={index}
                                        className={`w-full p-4 rounded-xl border-2 transition-all hover:bg-gray-50 m-0 flex items-center ${answers[currentStep] === index ? 'border-primary bg-primary/5' : 'border-gray-100'
                                            }`}
                                    >
                                        <span className="text-lg ml-2">{option}</span>
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>

                        <div className="flex justify-between items-center pt-4">
                            <Button
                                size="large"
                                disabled={currentStep === 0}
                                onClick={() => setCurrentStep(currentStep - 1)}
                            >
                                Quay lại
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                icon={currentStep === mockQuizQuestions.length - 1 ? <CheckCircleOutlined /> : <RightOutlined />}
                                disabled={answers[currentStep] === undefined}
                                onClick={handleNext}
                                className="bg-primary px-8"
                            >
                                {currentStep === mockQuizQuestions.length - 1 ? 'Nộp bài' : 'Câu tiếp theo'}
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Quiz Info Footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="shadow-soft border-0 text-center">
                        <FileTextOutlined className="text-2xl text-primary mb-2" />
                        <Title level={5} className="m-0">{mockQuizQuestions.length}</Title>
                        <Text type="secondary" className="text-xs">Tổng số câu hỏi</Text>
                    </Card>
                    <Card className="shadow-soft border-0 text-center">
                        <CheckCircleOutlined className="text-2xl text-success mb-2" />
                        <Title level={5} className="m-0">50%</Title>
                        <Text type="secondary" className="text-xs">Điểm đạt tối thiểu</Text>
                    </Card>
                    <Card className="shadow-soft border-0 text-center">
                        <ClockCircleOutlined className="text-2xl text-orange-500 mb-2" />
                        <Title level={5} className="m-0">15 Phút</Title>
                        <Text type="secondary" className="text-xs">Thời gian làm bài</Text>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default QuizView;
