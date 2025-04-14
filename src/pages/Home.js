import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qrImage from '../assets/images/qr.png';  // Убедись, что путь к изображению правильный
import './Home.css';  // Импортируем файл стилей

const { Title, Paragraph } = Typography;

const Home = () => {
  const [topTeachers, setTopTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopTeachers = async () => {
      try {
        const response = await axios.get('https://monitor-mmlp.onrender.com/api/top-teachers/');
        setTopTeachers(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке топ-учителей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTeachers();
  }, []);

  if (loading) return <Spin size="large" />;

  return (
    <div style={{ padding: '20px' }}>
      {/* Заголовок и основное описание с QR-кодом */}
      <div className="header-container">
        <div className="text-container">
          <Title level={2}>🖥️ Monitoring System</Title>
          <Paragraph style={{ fontSize: '18px' }}>
            Платформа для мониторинга достижений учителей. Наша система позволяет эффективно
            отслеживать и анализировать профессиональные успехи, формировать рейтинги и управлять
            данными в реальном времени.
          </Paragraph>
          <Paragraph style={{ fontSize: '18px' }}>Сканируйте QR-код для быстрого доступа</Paragraph>
        </div>
        <div className="qr-container">
          <img src={qrImage} alt="QR Code" />
        </div>
      </div>

      {/* Ключевые возможности системы */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
        <Card hoverable title="✅ Удобный интерфейс" style={{ borderRadius: '12px', width: '300px' }}>
          <p>
            Интуитивно понятный дизайн, который позволяет легко работать с системой, добавлять и
            проверять данные.
          </p>
        </Card>

        <Card hoverable title="📊 Автоматизация расчётов" style={{ borderRadius: '12px', width: '300px' }}>
          <p>
            Автоматический подсчёт баллов и формирование рейтингов на основе внесённых достижений
            и критериев.
          </p>
        </Card>

        <Card hoverable title="🔍 Гибкость и масштабируемость" style={{ borderRadius: '12px', width: '300px' }}>
          <p>
            Возможность загружать данные вручную или через Excel, а также адаптация системы под ваши
            задачи.
          </p>
        </Card>
      </div>

      {/* Удобства системы */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Title level={2}>💡 Удобства системы</Title>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <Card>
            <Title level={4}>🔄 Обновление данных</Title>
            <p>Легко добавлять или редактировать данные в системе с помощью простого интерфейса.</p>
          </Card>

          <Card>
            <Title level={4}>📊 Аналитика в реальном времени</Title>
            <p>Получение актуальной информации о результатах учителей без задержек, для принятия быстрых решений.</p>
          </Card>

          <Card>
            <Title level={4}>⚙️ Интуитивно понятные настройки</Title>
            <p>Простой и удобный интерфейс для настройки системы и работы с данными.</p>
          </Card>
        </div>
      </div>

      {/* Заголовок и топ-учителя */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Title>🏆 Топ 10 Учителей</Title>
      </div>

      <Card style={{ marginTop: '40px' }}>
        <List
          itemLayout="horizontal"
          dataSource={topTeachers}
          renderItem={(teacher, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{index + 1}</Avatar>}
                title={
                  <Link to={`/users/${teacher.id}`} style={{ fontWeight: 'bold' }}>
                    {teacher.username}
                  </Link>
                }
                description={`Общий балл: ${teacher.total_score}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Home;
