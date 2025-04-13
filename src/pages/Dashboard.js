import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, List, Avatar } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 👈 Добавляем Link

const { Title } = Typography;

const Dashboard = () => {
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
      <Title>🏆 Топ 10 Учителей</Title>

      <Card style={{ marginBottom: '20px' }}>
        <List
          itemLayout="horizontal"
          dataSource={topTeachers}
          renderItem={(teacher, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{index + 1}</Avatar>}
                title={
                  <Link to={`/users/${teacher.id}`}>
                    <strong>{teacher.username}</strong>
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

export default Dashboard;