import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, Table, Spin } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const UserProfile = () => {
  const { id } = useParams();  // Получаем ID пользователя из URL
  const [user, setUser] = useState(null);
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://monitor-mmlp.onrender.com/api/users/${id}/`);
        
        console.log('Data from API:', response.data);  // Логируем всю информацию от API

        setUser(response.data.user);  // Устанавливаем данные пользователя
        setIndicators(response.data.indicators);  // Устанавливаем показатели пользователя
      } catch (error) {
        console.error('Ошибка при загрузке профиля пользователя:', error);
      } finally {
        setLoading(false);  // Завершаем загрузку
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) return <Spin size="large" />;  // Показываем спиннер, пока данные загружаются

  console.log('User:', user);
  console.log('Indicators:', indicators);

  // Проверяем, есть ли points в данных показателей
  indicators.forEach((indicator, index) => {
    console.log(`Indicator ${index}:`, indicator);
    console.log(`Points:`, indicator.points); // Логируем баллы каждого показателя
  });

  // Проверяем, если total_score присутствует
  const totalScore = user?.total_score || 0;

  const columns = [
    {
      title: 'Показатель',
      dataIndex: 'indicator_title',
      key: 'indicator_title',
    },
    {
      title: 'Баллы',
      dataIndex: 'points',  // Заменено на points
      key: 'points',  // Заменено на points
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <Title>👤 Профиль пользователя</Title>

      {/* Информация о пользователе */}
      <Card style={{ marginBottom: '20px' }}>
        <Text strong>Имя пользователя:</Text> {user?.username} <br />
        <Text strong>Email:</Text> {user?.email} <br />
        <Text strong>Роль:</Text> {user?.is_admin ? 'Администратор' : 'Учитель'} <br />
        <Text strong>🏆 Общий балл:</Text> {totalScore}
      </Card>

      {/* Таблица с показателями */}
      <Card>
        <Title level={4}>Показатели и баллы:</Title>
        <Table
          columns={columns}
          dataSource={indicators}
          rowKey="id"
          pagination={false}  // Без пагинации для таблицы
        />
      </Card>
    </div>
  );
};

export default UserProfile;
