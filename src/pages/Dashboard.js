import React, { useState } from 'react';
import { Card, Typography, Select, Button, Input, List, Spin } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const Dashboard = () => {
  const [selectedDirection, setSelectedDirection] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const directions = ['Программирование', 'Дизайн', 'Маркетинг', 'Менеджмент'];
  const criteria = ['По имени', 'По баллам'];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (type, value) => {
    if (type === 'direction') {
      setSelectedDirection(value);
    } else if (type === 'criteria') {
      setSelectedCriteria(value);
    }
  };

  const filterData = () => {
    // Имитация фильтрации данных
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Пример фильтрации данных (можно заменить на реальную логику)
    }, 1000);
  };

  const data = [
    { id: 1, name: 'Иван Иванов', score: 300, direction: 'Программирование' },
    { id: 2, name: 'Мария Петрова', score: 500, direction: 'Дизайн' },
    { id: 3, name: 'Александр Сидоров', score: 200, direction: 'Маркетинг' },
    { id: 4, name: 'Ольга Смирнова', score: 350, direction: 'Менеджмент' },
  ];

  const filteredData = data.filter((item) => {
    return (
      (selectedDirection ? item.direction === selectedDirection : true) &&
      (selectedCriteria === 'По баллам' ? item.score : item.name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div style={{ padding: '20px' }}>
      <Title>Фильтр по направлениям и критериям</Title>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <strong>Выберите направление:</strong>{' '}
          <Select
            value={selectedDirection}
            onChange={(value) => handleFilterChange('direction', value)}
            style={{ width: 200 }}
          >
            {directions.map((direction) => (
              <Option key={direction} value={direction}>
                {direction}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <strong>Выберите критерий:</strong>{' '}
          <Select
            value={selectedCriteria}
            onChange={(value) => handleFilterChange('criteria', value)}
            style={{ width: 200 }}
          >
            {criteria.map((criterion) => (
              <Option key={criterion} value={criterion}>
                {criterion}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <strong>Поиск:</strong>{' '}
          <Input
            placeholder="Поиск по имени или баллам"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: 200 }}
          />
        </div>

        <Button type="primary" onClick={filterData}>
          Применить фильтры
        </Button>
      </Card>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Card>
          <Title level={4}>Результаты</Title>
          <List
            itemLayout="horizontal"
            dataSource={filteredData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<Link to={`/users/${item.id}`}>{item.name}</Link>}
                  description={`Баллы: ${item.score}, Направление: ${item.direction}`}
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
