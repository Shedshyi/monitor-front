import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

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
      {/* Заголовок и основное описание */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title>🖥️ Monitoring System</Title>
        <p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
          Платформа для мониторинга достижений учителей. Наша система позволяет эффективно
          отслеживать и анализировать профессиональные успехи, формировать рейтинги и управлять данными в реальном времени.
        </p>
      </div>

      {/* Ключевые возможности системы */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
        <Card hoverable title="✅ Удобный интерфейс" style={{ borderRadius: '12px', width: '300px' }}>
          <p>
            Интуитивно понятный дизайн, который позволяет легко работать с системой, добавлять и проверять данные.
          </p>
        </Card>

        <Card hoverable title="📊 Автоматизация расчётов" style={{ borderRadius: '12px', width: '300px' }}>
          <p>
            Автоматический подсчёт баллов и формирование рейтингов на основе внесённых достижений и критериев.
          </p>
        </Card>

        <Card hoverable title="🔍 Гибкость и масштабируемость" style={{ borderRadius: '12px', width: '300px' }}>
          <p>
            Возможность загружать данные вручную или через Excel, а также адаптация системы под ваши задачи.
          </p>
        </Card>
      </div>

      {/* Преимущества системы */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Title level={2}>🚀 Почему выбирают Monitoring System?</Title>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
          <Card>
            <Title level={4}>📈 Прозрачность и контроль</Title>
            <p>
              Учителя и администраторы получают полный доступ к данным, что позволяет анализировать достижения и формировать объективные отчёты.
            </p>
          </Card>

          <Card>
            <Title level={4}>📋 Массовое обновление данных</Title>
            <p>
              Администратор может быстро загружать и обновлять данные через Excel, что экономит время и упрощает работу.
            </p>
          </Card>

          <Card>
            <Title level={4}>🔔 Уведомления и отчёты</Title>
            <p>
              Возможность получать уведомления об изменениях и формировать детализированные отчёты для анализа.
            </p>
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
