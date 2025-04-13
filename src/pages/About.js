import React from 'react';
import { Layout, Row, Col, Card, Form, Input, Button, Checkbox } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './About.css';

const About = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Layout.Content style={{ padding: '40px', backgroundColor: '#f4f6f9' }}>
      <Row gutter={[32, 32]} align="top">
        {/* Contact Details */}
        <Col xs={24} md={12} lg={10}>
          <Card
            title="Контакты"
            variant="borderless"
            style={{
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              background: '#ffffff',
            }}
            styles={{ header: { fontSize: '24px', color: '#3c3c3c' } }}
          >
            <p>
              <EnvironmentOutlined style={{ color: '#1890ff', marginRight: '10px' }} /> Kostanay
            </p>
            <p>
              <ClockCircleOutlined style={{ color: '#1890ff', marginRight: '10px' }} /> Пн-Сб с 10:00 до 19:00
            </p>
            <p>
              <ClockCircleOutlined style={{ color: '#1890ff', marginRight: '10px' }} /> Вс с 10:00 до 18:00
            </p>
            <p>
              <PhoneOutlined style={{ color: '#1890ff', marginRight: '10px' }} /> +7 777-777 77 77
            </p>
          </Card>
        </Col>

        {/* Map */}
        <Col xs={24} md={12} lg={14}>
          <Card
            title="Наше местоположение"
            variant="borderless"
            style={{
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              background: '#ffffff',
            }}
            styles={{ header: { fontSize: '24px', color: '#3c3c3c' } }}
          >
            <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
              <iframe
                width="100%"
                height="450"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kostanay+(Kostanay)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Kostanay Map"
              ></iframe>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: '50px' }}>
        <Col span={24}>
          <Card
            title="Форма обратной связи"
            variant="borderless"
            style={{
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              background: '#ffffff',
            }}
            styles={{ header: { fontSize: '24px', color: '#3c3c3c' } }}
          >
            <p style={{ fontSize: '18px', color: '#5a5a5a' }}>
              Опишите свой вопрос, и мы вам обязательно ответим
            </p>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ maxWidth: '1000px', margin: '0 auto' }}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
                  >
                    <Input placeholder="Имя" style={{ borderRadius: '8px', padding: '12px' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваш телефон!' }]}
                  >
                    <Input placeholder="+77" style={{ borderRadius: '8px', padding: '12px' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, type: 'email', message: 'Пожалуйста, введите корректный e-mail!' },
                    ]}
                  >
                    <Input placeholder="e-mail" style={{ borderRadius: '8px', padding: '12px' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="message"
                rules={[{ required: true, message: 'Пожалуйста, введите ваше сообщение!' }]}
              >
                <Input.TextArea
                  placeholder="Введите ваше сообщение"
                  rows={4}
                  style={{ borderRadius: '8px', padding: '12px' }}
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject('Необходимо согласие на обработку данных'),
                  },
                ]}
              >
                <Checkbox>Подтвердите свое согласие на обработку персональных данных.</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#1890ff',
                    borderRadius: '8px',
                    padding: '12px 0',
                    fontSize: '18px',
                  }}
                >
                  Отправить
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default About;
