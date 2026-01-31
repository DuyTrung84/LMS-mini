import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Tag, Space, message, Upload, InputNumber } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  BookOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiFetch } from '@/lib/api';

const { TextArea } = Input;

// Define Course Interface based on Backend Schema
export interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string; // Mapped to coverImage
  startDate?: string;
  endDate?: string;
  duration?: number;
  lessonCount?: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

const ManageCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch Courses from API
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await apiFetch<Course[]>('/courses');
      // Ensure data is array
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      message.error('Không thể tải danh sách khóa học');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAdd = () => {
    setEditingCourse(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Course) => {
    setEditingCourse(record);
    // Map backend fields to form fields if necessary
    form.setFieldsValue({
      ...record,
      // Example: if backend uses convertImage but form uses thumbnail, map it here
      // thumbnail: record.coverImage
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa khóa học này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await apiFetch(`/courses/${id}`, { method: 'DELETE' });
          setCourses(courses.filter(c => c.id !== id));
          message.success('Xóa khóa học thành công!');
        } catch (error) {
          message.error('Lỗi khi xóa khóa học');
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      // Default values for new course
      const courseData = {
        ...values,
        // Add default fields needed by backend if they are required and not in form
        // status: 'draft' 
      };

      if (editingCourse) {
        // Update
        const updated = await apiFetch<Course>(`/courses/${editingCourse.id}`, {
          method: 'PATCH',
          body: JSON.stringify(courseData)
        });
        setCourses(courses.map(c => c.id === editingCourse.id ? updated : c));
        message.success('Cập nhật khóa học thành công!');
      } else {
        // Create
        const created = await apiFetch<Course>(`/courses`, {
          method: 'POST',
          body: JSON.stringify(courseData)
        });
        setCourses([...courses, created]);
        message.success('Thêm khóa học thành công!');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Save error:', error);
      message.error('Có lỗi xảy ra khi lưu khóa học');
    }
  };

  const columns = [
    {
      title: 'Khóa học',
      key: 'course',
      render: (_: any, record: Course) => (
        <div className="flex items-center gap-3">
          <img
            src={record.thumbnail || 'https://via.placeholder.com/150'}
            alt={record.title}
            className="w-20 h-14 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-foreground">{record.title}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Thời lượng',
      dataIndex: 'duration',
      key: 'duration',
      render: (val: number) => val ? `${val} phút` : '-' // Adjust unit based on what you store
    },
    {
      title: 'Bài học',
      dataIndex: 'lessonCount', // Use lessonCount from backend if available, or lessons.length
      key: 'lessonCount',
      render: (value: number) => `${value || 0} bài`,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: string) => new Date(val).toLocaleDateString('vi-VN')
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Course) => (
        <Space>
          {/* Quick Edit (Modal) */}
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          {/* Detail View (Lessons) */}
          <Button
            type="text"
            icon={<UnorderedListOutlined />}
            onClick={() => navigate(`/teacher/course/${record.id}`)}
            title="Quản lý bài học"
          />
          <Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quản lý khóa học</h1>
            <p className="text-muted-foreground">Tạo, chỉnh sửa và quản lý các khóa học của bạn</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleAdd}>
            Tạo khóa học mới
          </Button>
        </div>

        <Card className="border-0 shadow-soft">
          <Table
            dataSource={courses}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            loading={loading}
          />
        </Card>

        <Modal
          title={
            <span>
              <BookOutlined className="mr-2" />
              {editingCourse ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
            </span>
          }
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={() => setIsModalOpen(false)}
          okText={editingCourse ? 'Cập nhật' : 'Tạo mới'}
          cancelText="Hủy"
          width={600}
        >
          <Form form={form} layout="vertical" className="mt-4">
            <Form.Item
              name="title"
              label="Tên khóa học"
              rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
            >
              <Input placeholder="Nhập tên khóa học" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            >
              <TextArea rows={4} placeholder="Nhập mô tả khóa học" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="thumbnail" label="Ảnh bìa">
                <Upload maxCount={1} listType="picture-card">
                  <div>
                    <UploadOutlined />
                    <div className="mt-2">Tải lên</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </DashboardLayout >
  );
};

export default ManageCourses;
