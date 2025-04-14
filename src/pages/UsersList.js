import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin, Input, Card } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Search } = Input;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://monitor-mmlp.onrender.com/api/users/');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Обработчик поиска
  const handleSearch = (value) => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const columns = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <Link to={`/users/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Роль',
      dataIndex: 'is_admin',
      key: 'is_admin',
      render: (isAdmin) => (isAdmin ? 'Администратор' : 'Учитель'),
    },
    {
      title: 'Общий балл',
      dataIndex: 'total_score',
      key: 'total_score',
      sorter: (a, b) => b.total_score - a.total_score,
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>📋 Список пользователей</Title>
      <Card>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            {/* Поле поиска */}
            <Search
              placeholder="🔍 Поиск по имени пользователя"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ marginBottom: '20px', maxWidth: '400px' }}
            />

            <Table
              columns={columns}
              dataSource={filteredUsers}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default UsersList;
