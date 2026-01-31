import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Button, Switch, Select, Divider, Space, message, Upload, Tabs, Statistic } from 'antd';
import { SaveOutlined, ReloadOutlined, UploadOutlined, SettingOutlined, DatabaseOutlined, BellOutlined, ShakeOutlined } from '@ant-design/icons';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface SystemSettings {
  siteName: string;
  siteEmail: string;
  siteUrl: string;
  timezone: string;
  language: string;
  maxUploadSize: number;
  sessionTimeout: number;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  twoFactorAuth: boolean;
  backupFrequency: string;
  logoUrl: string;
  faviconUrl: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'LMS Platform',
    siteEmail: 'info@lms.edu.vn',
    siteUrl: 'https://lms.edu.vn',
    timezone: 'Asia/Ho_Chi_Minh',
    language: 'vi',
    maxUploadSize: 100,
    sessionTimeout: 30,
    maintenanceMode: false,
    emailNotifications: true,
    twoFactorAuth: false,
    backupFrequency: 'daily',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
  });

  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    form.validateFields().then((values) => {
      setIsSaving(true);
      setTimeout(() => {
        setSettings(values);
        setIsSaving(false);
        message.success('Cài đặt đã được lưu thành công');
      }, 1000);
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleResetToDefault = () => {
    form.setFieldsValue({
      siteName: 'LMS Platform',
      siteEmail: 'info@lms.edu.vn',
      siteUrl: 'https://lms.edu.vn',
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      maxUploadSize: 100,
      sessionTimeout: 30,
      maintenanceMode: false,
      emailNotifications: true,
      twoFactorAuth: false,
      backupFrequency: 'daily',
    });
    message.info('Cài đặt đã được khôi phục về mặc định');
  };

  const tabs = [
    {
      key: 'general',
      label: 'Cài đặt chung',
      children: (
        <Card className="border-0 shadow-soft">
          <Form
            form={form}
            layout="vertical"
            initialValues={settings}
            autoComplete="off"
          >
            <Form.Item
              label="Tên trang web"
              name="siteName"
              rules={[{ required: true, message: 'Vui lòng nhập tên trang web' }]}
            >
              <Input placeholder="Ví dụ: LMS Platform" />
            </Form.Item>

            <Form.Item
              label="Email liên hệ"
              name="siteEmail"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input placeholder="info@example.com" />
            </Form.Item>

            <Form.Item
              label="URL trang web"
              name="siteUrl"
              rules={[{ required: true, message: 'Vui lòng nhập URL' }]}
            >
              <Input placeholder="https://example.com" />
            </Form.Item>

            <Form.Item
              label="Múi giờ"
              name="timezone"
              rules={[{ required: true, message: 'Vui lòng chọn múi giờ' }]}
            >
              <Select
                options={[
                  { label: 'Asia/Ho_Chi_Minh (UTC+7)', value: 'Asia/Ho_Chi_Minh' },
                  { label: 'Asia/Bangkok (UTC+7)', value: 'Asia/Bangkok' },
                  { label: 'Asia/Shanghai (UTC+8)', value: 'Asia/Shanghai' },
                  { label: 'UTC', value: 'UTC' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Ngôn ngữ mặc định"
              name="language"
              rules={[{ required: true, message: 'Vui lòng chọn ngôn ngữ' }]}
            >
              <Select
                options={[
                  { label: 'Tiếng Việt', value: 'vi' },
                  { label: 'English', value: 'en' },
                  { label: 'Tiếng Trung', value: 'zh' },
                ]}
              />
            </Form.Item>

            <Divider />

            <Form.Item
              label="Logo"
              name="logoUrl"
            >
              <Input placeholder="/logo.png" />
            </Form.Item>

            <Form.Item
              label="Favicon"
              name="faviconUrl"
            >
              <Input placeholder="/favicon.ico" />
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'security',
      label: 'Bảo mật',
      children: (
        <Card className="border-0 shadow-soft">
          <Form
            form={form}
            layout="vertical"
            initialValues={settings}
            autoComplete="off"
          >
            <Form.Item
              label="Thời gian hết phiên đăng nhập (phút)"
              name="sessionTimeout"
              rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}
            >
              <Input type="number" placeholder="30" />
            </Form.Item>

            <Form.Item
              label="Xác thực hai yếu tố"
              name="twoFactorAuth"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Kích hoạt chế độ bảo trì"
              name="maintenanceMode"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Divider />

            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Quản lý phiên đăng nhập</h4>
                <Space>
                  <Button type="primary" danger>Đăng xuất tất cả người dùng</Button>
                  <Button>Xóa phiên hết hạn</Button>
                </Space>
              </div>
            </div>
          </Form>
        </Card>
      ),
    },
    {
      key: 'notification',
      label: 'Thông báo',
      children: (
        <Card className="border-0 shadow-soft">
          <Form
            form={form}
            layout="vertical"
            initialValues={settings}
            autoComplete="off"
          >
            <Form.Item
              label="Bật thông báo email"
              name="emailNotifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Divider />

            <Form.Item label="Cài đặt SMTP">
              <div className="space-y-3 bg-gray-50 p-4 rounded">
                <Input placeholder="SMTP Host (ví dụ: smtp.gmail.com)" />
                <Input placeholder="SMTP Port (ví dụ: 587)" />
                <Input placeholder="Username" />
                <Input.Password placeholder="Password" />
                <Button>Kiểm tra kết nối</Button>
              </div>
            </Form.Item>

            <Divider />

            <div>
              <h4 className="font-medium mb-3">Các loại thông báo</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>Thông báo đăng ký khóa học</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>Thông báo hoàn thành bài tập</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>Thông báo cập nhật khóa học</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Form>
        </Card>
      ),
    },
    {
      key: 'storage',
      label: 'Lưu trữ & Sao lưu',
      children: (
        <Card className="border-0 shadow-soft">
          <Form
            form={form}
            layout="vertical"
            initialValues={settings}
            autoComplete="off"
          >
            <Form.Item
              label="Dung lượng tệp tối đa (MB)"
              name="maxUploadSize"
              rules={[{ required: true, message: 'Vui lòng nhập dung lượng' }]}
            >
              <Input type="number" placeholder="100" />
            </Form.Item>

            <Form.Item
              label="Tần suất sao lưu"
              name="backupFrequency"
              rules={[{ required: true, message: 'Vui lòng chọn tần suất' }]}
            >
              <Select
                options={[
                  { label: 'Hàng ngày', value: 'daily' },
                  { label: 'Hàng tuần', value: 'weekly' },
                  { label: 'Hàng tháng', value: 'monthly' },
                ]}
              />
            </Form.Item>

            <Divider />

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Card className="border-0 shadow-soft">
                  <Statistic
                    title="Dung lượng sử dụng"
                    value={45.6}
                    suffix="GB"
                  />
                  <Button block className="mt-3">Xem chi tiết</Button>
                </Card>
              </Col>
              <Col xs={24} sm={12}>
                <Card className="border-0 shadow-soft">
                  <Statistic
                    title="Dung lượng khả dụng"
                    value={454.4}
                    suffix="GB"
                  />
                  <Button block className="mt-3">Nâng cấp</Button>
                </Card>
              </Col>
            </Row>

            <Divider />

            <h4 className="font-medium mb-3">Quản lý sao lưu</h4>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button block type="primary">Tạo sao lưu ngay</Button>
              <Button block>Khôi phục sao lưu</Button>
              <Button block danger>Xóa tất cả sao lưu cũ</Button>
            </Space>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Header Stats */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Trạng thái hệ thống"
                value="Bình thường"
                valueStyle={{ color: '#22c55e' }}
                prefix={<SettingOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Phiên đăng nhập hoạt động"
                value={23}
                prefix={<ShakeOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Sao lưu gần nhất"
                value="Hôm nay"
                prefix={<DatabaseOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-soft">
              <Statistic
                title="Thông báo chờ xử lý"
                value={5}
                prefix={<BellOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Settings Tabs */}
        <Card className="border-0 shadow-soft">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabs}
          />

          <Divider />

          {/* Action Buttons */}
          <Space>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={isSaving}
              onClick={handleSave}
            >
              Lưu thay đổi
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
            >
              Đặt lại
            </Button>
            <Button onClick={handleResetToDefault}>
              Khôi phục mặc định
            </Button>
          </Space>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
