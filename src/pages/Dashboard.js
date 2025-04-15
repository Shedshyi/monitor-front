import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Spin,
  List,
  Avatar,
  Select,
} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const { Title } = Typography;
const { Option } = Select;

// Определяем функцию isNumber
const isNumber = (value) => typeof value === 'number' && !isNaN(value);

const Dashboard = () => {
  const [topTeachers, setTopTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState('score');

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

  // 🔢 Моки для LineChart
  const activityData = [
    { month: 'Янв', teacher1: 400, teacher2: 300, teacher3: 200, teacher4: 250, teacher5: 180 },
    { month: 'Фев', teacher1: 420, teacher2: 320, teacher3: 220, teacher4: 280, teacher5: 190 },
    { month: 'Мар', teacher1: 450, teacher2: 330, teacher3: 250, teacher4: 300, teacher5: 210 },
    { month: 'Апр', teacher1: 470, teacher2: 340, teacher3: 280, teacher4: 320, teacher5: 220 },
    { month: 'Май', teacher1: 490, teacher2: 350, teacher3: 300, teacher4: 340, teacher5: 240 },
  ];

  // 📊 Моки для BarChart
  const weeklyData = [
    { day: 'Пн', score: 200 },
    { day: 'Вт', score: 300 },
    { day: 'Ср', score: 250 },
    { day: 'Чт', score: 400 },
    { day: 'Пт', score: 450 },
    { day: 'Сб', score: 100 },
    { day: 'Вс', score: 150 },
  ];

  // 🧁 Моки для PieChart
  const pieData = [
    { name: 'Учителя', value: 95 },
    { name: 'Админы', value: 5 },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  const sortedTeachers = [...topTeachers].sort((a, b) =>
    sortType === 'score'
      ? b.total_score - a.total_score
      : a.username.localeCompare(b.username)
  );

  if (loading) return <Spin size="large" />;

  // Кастомный Tooltip для LineChart с проверкой isNumber
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="custom-tooltip">
          <p>{label}</p>
          <p>{isNumber(value) ? `Value: ${value}` : 'No valid number'}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title>🏆 Топ 10 Учителей</Title>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <strong>Сортировка:</strong>{' '}
          <Select value={sortType} onChange={setSortType} style={{ width: 200 }}>
            <Option value="score">По баллам</Option>
            <Option value="name">По имени</Option>
          </Select>
        </div>

        <List
          itemLayout="horizontal"
          dataSource={sortedTeachers}
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

      {/* 📈 График активности по месяцам */}
      <Card style={{ marginBottom: 20 }}>
        <Title level={4}>📈 Активность топ-5 по месяцам</Title>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="teacher1" stroke="#8884d8" name="Учитель 1" />
            <Line type="monotone" dataKey="teacher2" stroke="#82ca9d" name="Учитель 2" />
            <Line type="monotone" dataKey="teacher3" stroke="#ffc658" name="Учитель 3" />
            <Line type="monotone" dataKey="teacher4" stroke="#ff7300" name="Учитель 4" />
            <Line type="monotone" dataKey="teacher5" stroke="#0088FE" name="Учитель 5" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* 📊 Бар график по дням недели */}
      <Card style={{ marginBottom: 20 }}>
        <Title level={4}>📊 Активность по дням недели</Title>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#1890ff" name="Общий балл" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* 🧁 Pie Chart по ролям */}
      <Card>
        <Title level={4}>🧁 Роли пользователей</Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              dataKey="value"
              nameKey="name"
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;
