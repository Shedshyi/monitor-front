import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

const Footer = () => (
  <AntFooter style={{ background: '#4C668A', padding: '40px 20px', color: '#ffffff' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={[32, 32]} justify="center">
        {/* О системе */}
        <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
          <Title level={4} style={{ color: '#ffffff' }}>🖥️ Monitoring System</Title>
          <Text style={{ color: '#ffffff' }}>
            Платформа для мониторинга достижений учителей.
            Отслеживайте прогресс и анализируйте результаты.
          </Text>
        </Col>

        {/* Полезные ссылки */}
        <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
          <Title level={4} style={{ color: '#ffffff' }}>🔗 Полезные ссылки</Title>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            <li><a href="/privacy" style={{ color: '#ffffff' }}>Политика конфиденциальности</a></li>
            <li><a href="/terms" style={{ color: '#ffffff' }}>Условия использования</a></li>
            <li><a href="/support" style={{ color: '#ffffff' }}>Поддержка</a></li>
          </ul>
        </Col>

        {/* Контакты */}
        <Col xs={24} sm={24} md={8} style={{ textAlign: 'center' }}>
          <Title level={4} style={{ color: '#ffffff' }}>📧 Контакты</Title>
          <p>Email: <a href="mailto:support@example.com" style={{ color: '#ffffff' }}>support@example.com</a></p>
          <p>Телефон: +7 (777) 123-45-67</p>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        © {new Date().getFullYear()} Monitoring System | Все права защищены
      </div>
    </div>
  </AntFooter>
);

export default Footer;