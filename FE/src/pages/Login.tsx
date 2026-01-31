import React, { useState } from 'react';
import { Form, Input, Button, Card, Radio, message } from 'antd';
import { UserOutlined, LockOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("STUDENT");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const success = await login(values.email, values.password, selectedRole);
      if (success) {
        message.success('Đăng nhập thành công!');
        navigate('/dashboard');
      }
    } catch {
      message.error('Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { label: '🎓 Sinh viên', value: 'STUDENT' },
    { label: '👨‍🏫 Giảng viên', value: 'TEACHER' },
    { label: '⚙️ Quản trị viên', value: 'ADMIN' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="mx-auto relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-4xl font-bold mb-4 text-center">
            Hệ thống Quản lý Khóa học
          </h1>
          <p className="text-xl text-white/80 text-center max-w-md">
            Nền tảng học tập trực tuyến hiện đại, giúp bạn tiếp cận kiến thức mọi lúc, mọi nơi
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-white/70">Khóa học</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">2000+</div>
              <div className="text-white/70">Sinh viên</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">30+</div>
              <div className="text-white/70">Giảng viên</div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-xl animate-fade-in">
          <div className="text-center mb-8">
            <div className="lg:hidden text-5xl mb-4">📚</div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Chào mừng trở lại
            </h2>
            <p className="text-muted-foreground">
              Đăng nhập để tiếp tục học tập
            </p>
          </div>

          <Card className="shadow-card border-0">
            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              initialValues={{ email: '', password: '' }}
            >
              <Form.Item label="Chọn vai trò" className="mb-6">
                <Radio.Group
                  options={roleOptions}
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  optionType="button"
                  buttonStyle="solid"
                  className="w-full grid grid-cols-3 gap-2"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-muted-foreground" />}
                  placeholder="your.email@lms.edu.vn"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-muted-foreground" />}
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>

              <div className="flex justify-between items-center mb-6">
                <a className="text-primary hover:text-primary-dark">
                  Quên mật khẩu?
                </a>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-12 text-base font-medium"
                  icon={<BookOutlined />}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
