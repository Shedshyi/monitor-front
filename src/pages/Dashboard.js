import React, { useState, useEffect } from 'react';
import { Card, Typography, Select, Button, Input, List, Spin } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [directions, setDirections] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://monitor-mmlp.onrender.com/api/best-teachers/')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        
        // Сбор уникальных направлений и критериев с бэка
        const allDirections = [];
        const allCriteria = [];
        
        response.data.forEach(item => {
          item.directions.forEach(direction => {
            if (!allDirections.includes(direction.direction_title)) {
              allDirections.push(direction.direction_title);
            }
            direction.criteria.forEach(criterion => {
              if (!allCriteria.includes(criterion.criteria_title)) {
                allCriteria.push(criterion.criteria_title);
              }
            });
          });
        });

        setDirections(allDirections);
        setCriteria(allCriteria);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
        setLoading(false);
      });
  }, []);

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
    setLoading(true);
    let filtered = data;

    if (selectedDirection) {
      filtered = filtered.filter((item) =>
        item.directions.some(
          (direction) => direction.direction_title === selectedDirection
        )
      );
    }

    if (selectedCriteria) {
      filtered = filtered.filter((item) =>
        item.directions.some((direction) =>
          direction.criteria.some(
            (criteria) => criteria.criteria_title === selectedCriteria
          )
        )
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title>Фильтр по направлениям и критериям</Title>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <strong>Выберите направление:</strong>{' '}
          <Select
            value={selectedDirection}
            onChange={(value) => handleFilterChange('direction', value)}
            style={{ width: 300 }}
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
            style={{ width: 300 }}
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
            placeholder="Поиск по имени"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: 300 }}
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
                  title={<Link to={`/users/${item.id}`}>{item.username}</Link>}
                  description={`Направления: ${item.directions
                    .map((direction) => direction.direction_title)
                    .join(', ')}`}
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
