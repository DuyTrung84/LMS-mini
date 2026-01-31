import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Button, Select, Tag, Space, Modal, Empty } from 'antd';
import {
  SendOutlined,
  BellOutlined,
  BookOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockCourses } from '@/data/mockData';

interface Notification {
  id: string;
  subject: string;
  message: string;
  courseId: string;
  courseName: string;
  sentAt: string;
  recipients: number;
}

const TeacherNotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      subject: 'Nhắc nhở bài tập tuần 5',
      message: 'Sinh viên các em vui lòng hoàn thành bài tập trên lớp học trực tuyến trước hết ngày mai.',
      courseId: '1',
      courseName: 'Lập trình Web với React',
      sentAt: '2024-01-25 10:30',
      recipients: 156,
    },
    {
      id: '2',
      subject: 'Cập nhật tài liệu mới',
      message: 'Tài liệu của tuần này đã được cập nhật. Vui lòng tải xuống và học tập.',
      courseId: '2',
      courseName: 'Cơ sở dữ liệu MongoDB',
      sentAt: '2024-01-24 14:00',
      recipients: 89,
    },
    {
      id: '3',
      subject: 'Thông báo lịch học bù',
      message: 'Lớp học tuần sau sẽ được dời sang thứ 5 do lí do công tác.',
      courseId: '3',
      courseName: 'API với .NET 8',
      sentAt: '2024-01-23 09:15',
      recipients: 245,
    },
  ]);

  // Get teacher's courses (mock data - in real app would filter by teacher)
  const teacherCourses = mockCourses.filter(c => c.instructor === user?.name || !c.instructor);

  const handleSendNotification = async (values: any) => {
    try {
      const courseName = teacherCourses.find(c => c.id === values.courseId)?.title || 'Tất cả khóa học';
      const newNotification: Notification = {
        id: (Math.max(...notifications.map(n => parseInt(n.id))) + 1).toString(),
        subject: values.subject,
        message: values.message,
        courseId: values.courseId,
        courseName: courseName,
        sentAt: new Date().toLocaleString('vi-VN'),
        recipients: Math.floor(Math.random() * 200) + 50,
      };

      setNotifications([newNotification, ...notifications]);
      form.resetFields();

      Modal.success({
        title: 'Thành công',
        content: `Đã gửi thông báo đến ${newNotification.recipients} học viên`,
        okText: 'Đóng',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleViewNotification = (notification: Notification) => {
    Modal.info({
      title: notification.subject,
      width: 600,
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Khóa học:</p>
            <p className="font-medium">{notification.courseName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Nội dung:</p>
            <p className="whitespace-pre-wrap">{notification.message}</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <ClockCircleOutlined /> {notification.sentAt}
              </span>
              <span className="flex items-center gap-1">
                <TeamOutlined /> {notification.recipients} học viên
              </span>
            </div>
          </div>
        </div>
      ),
      okText: 'Đóng',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gửi thông báo</h1>
          <p className="text-muted-foreground mt-1">
            Gửi thông báo và nhắc nhở đến sinh viên
          </p>
        </div>

        {/* Main Content - 2 Columns Layout */}
        <Row gutter={[24, 24]}>
          {/* Left Column - Compose Form */}
          <Col xs={24} lg={12}>
            <Card className="border-0 shadow-soft h-full">
              <div className="flex items-center gap-2 mb-6">
                <SendOutlined className="text-primary text-lg" />
                <h2 className="text-xl font-semibold text-foreground">Soạn thông báo mới</h2>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSendNotification}
                className="space-y-4"
              >
                <Form.Item
                  label="Gửi đến"
                  name="courseId"
                  rules={[{ required: true, message: 'Vui lòng chọn khóa học' }]}
                >
                  <Select 
                    placeholder="Chọn khóa học"
                    size="large"
                  >
                    <Select.Option value="all">Tất cả khóa học</Select.Option>
                    {teacherCourses.map(course => (
                      <Select.Option key={course.id} value={course.id}>
                        {course.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Tiêu đề"
                  name="subject"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tiêu đề' },
                    { min: 5, message: 'Tiêu đề phải có ít nhất 5 ký tự' },
                  ]}
                >
                  <Input
                    placeholder="Nhập tiêu đề thông báo..."
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label="Nội dung"
                  name="message"
                  rules={[
                    { required: true, message: 'Vui lòng nhập nội dung' },
                    { min: 10, message: 'Nội dung phải có ít nhất 10 ký tự' },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Nhập nội dung thông báo..."
                    rows={6}
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large"
                    block
                    icon={<SendOutlined />}
                  >
                    Gửi thông báo
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Right Column - Notifications List */}
          <Col xs={24} lg={12}>
            <Card className="border-0 shadow-soft h-full">
              <div className="flex items-center gap-2 mb-6">
                <BellOutlined className="text-primary text-lg" />
                <h2 className="text-xl font-semibold text-foreground">Thông báo đã gửi</h2>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      className="p-4 rounded-lg border border-border hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                      onClick={() => handleViewNotification(notification)}
                    >
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                        {notification.subject}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <BookOutlined className="flex-shrink-0" />
                          <span className="truncate">{notification.courseName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <ClockCircleOutlined /> {notification.sentAt}
                          </span>
                          <Tag color="blue" icon={<TeamOutlined />}>
                            {notification.recipients}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <Empty
                    description="Chưa có thông báo nào"
                    style={{ paddingTop: 20, paddingBottom: 20 }}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default TeacherNotificationsPage;
