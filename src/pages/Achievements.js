import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin, Select, Card, Button, Alert } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const Achievements = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [directions, setDirections] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [indicatorScore, setIndicatorScore] = useState(null); // Состояние для хранения баллов индикатора

  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [directionsRes] = await Promise.all([
          axios.get('https://monitor-mmlp.onrender.com/api/test-directions/')
        ]);

        setDirections(directionsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Обновляем критерии при выборе направления
  useEffect(() => {
    if (selectedDirection) {
      const selectedDir = directions.find(dir => dir.id === selectedDirection);
      setCriteria(selectedDir ? selectedDir.criteria : []);
      setSelectedCriteria(null); // Сбрасываем критерий при смене направления
    }
  }, [selectedDirection, directions]);

  // Обновляем показатели при выборе критерия
  useEffect(() => {
    if (selectedCriteria) {
      const selectedCrit = criteria.find(crit => crit.id === selectedCriteria);
      setIndicators(selectedCrit ? selectedCrit.indicators : []);
    } else {
      setIndicators([]);
    }
  }, [selectedCriteria, criteria]);

  // Функция для обработки изменения индикатора и получения баллов
  const handleIndicatorChange = async (indicatorId) => {
    setSelectedIndicator(indicatorId);

    if (indicatorId) {
      try {
        const response = await axios.get(`https://monitor-mmlp.onrender.com/api/indicator-score/${indicatorId}`);
        setIndicatorScore(response.data.score); // Сохраняем баллы индикатора
      } catch (error) {
        console.error('Ошибка при загрузке баллов индикатора:', error);
      }
    } else {
      setIndicatorScore(null); // Очищаем баллы, если индикатор не выбран
    }
  };

  // Функция для отправки запроса
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Отправляем запрос с выбранными фильтрами
      const response = await axios.get('https://monitor-mmlp.onrender.com/api/filter-teachers/', {
        params: {
          direction_id: selectedDirection,
          criteria_id: selectedCriteria,
          indicator_id: selectedIndicator
        }
      });

      setData(response.data); // Обновляем список пользователей с учетом фильтров
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <Link to={`/users/${record.id}`}>{text}</Link>,
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
      <Title level={2}>🏅 Достижения пользователей</Title>

      <Card style={{ marginBottom: '20px' }}>
        <Select
          placeholder="Выберите направление"
          style={{ width: 200, marginRight: 10 }}
          onChange={setSelectedDirection}
          allowClear
        >
          {directions.map((dir) => (
            <Option key={dir.id} value={dir.id}>{dir.title}</Option>
          ))}
        </Select>

        <Select
          placeholder="Выберите критерий"
          style={{ width: 200, marginRight: 10 }}
          onChange={setSelectedCriteria}
          value={selectedCriteria}
          disabled={!selectedDirection}
          allowClear
        >
          {criteria.map((crit) => (
            <Option key={crit.id} value={crit.id}>{crit.title}</Option>
          ))}
        </Select>

        <Select
          placeholder="Выберите показатель"
          style={{ width: 200 }}
          onChange={handleIndicatorChange} // Используем обновленную функцию
          value={selectedIndicator}
          disabled={!selectedCriteria}
          allowClear
        >
          {indicators.map((ind) => (
            <Option key={ind.id} value={ind.id}>{ind.title}</Option>
          ))}
        </Select>

        {/* Кнопка сабмита */}
        <Button type="primary" onClick={handleSubmit} style={{ marginTop: 10 }}>
          Применить фильтры
        </Button>
      </Card>

      {/* Показываем карточку с баллом, если выбран индикатор */}
      {indicatorScore !== null && (
        <Card style={{ marginBottom: '20px' }}>
          <Title level={4}>Баллы за выбранный индикатор:</Title>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {indicatorScore} баллов
          </div>
        </Card>
      )}

      {loading ? <Spin size="large" /> : (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default Achievements;
