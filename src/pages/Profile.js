import React, { useState, useEffect } from 'react';
import { Typography, Card, Table, Spin } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const storedUser = JSON.parse(localStorage.getItem('user'));
  
      if (!accessToken || !storedUser) {
        navigate('/login');
        return;
      }
  
      setUser(storedUser);
  
      try {
        const response = await axios.get('https://monitor-mmlp.onrender.com/api/my-scores/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const rawData = response.data || [];
        console.log('Raw data from API:', rawData);  // Логируем полученные данные
  
        // Трансформируем данные в нужный формат
        const transformed = [];
        let total = 0;
  
        rawData.forEach(direction => {
          // Каждый элемент rawData уже содержит данные о направлении, критерии и показателе
          transformed.push({
            id: direction.id,
            direction_title: direction.direction_title,
            criteria_title: direction.criteria_title,
            indicator_title: direction.indicator_title,
            indicator_points: direction.points || 0,
          });
  
          total += direction.points || 0;  // Добавляем баллы
        });
  
        console.log('Transformed data:', transformed);  // Логируем преобразованные данные
  
        setScores(transformed);
        setTotalPoints(total);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);

  if (loading) return <Spin size="large" />;

  const columns = [
    {
      title: 'Направление',
      dataIndex: 'direction_title',
      key: 'direction_title',
    },
    {
      title: 'Критерий',
      dataIndex: 'criteria_title',
      key: 'criteria_title',
    },
    {
      title: 'Показатель',
      dataIndex: 'indicator_title',
      key: 'indicator_title',
    },
    {
      title: 'Баллы',
      dataIndex: 'indicator_points',
      key: 'indicator_points',
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <Title>👤 Личный кабинет</Title>

      <Card style={{ marginBottom: '20px' }}>
        <Title level={4}>Информация о пользователе</Title>
        <Text strong>Имя пользователя:</Text> {user?.username} <br />
        <Text strong>Email:</Text> {user?.email} <br />
        <Text strong>Роль:</Text> {user?.is_admin ? 'Администратор' : 'Учитель'}
      </Card>

      <Card style={{ marginBottom: '20px' }}>
        <Title level={4}>🏆 Ваш общий балл:</Title>
        <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalPoints} баллов</Text>
      </Card>

      <Card>
        <Title level={4}>Ваши показатели и баллы</Title>
        <Table columns={columns} dataSource={scores} rowKey="id" pagination={{ pageSize: 5 }} />
      </Card>
    </div>
  );
};

export default Profile;
