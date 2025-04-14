import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin, Select, Card, Button } from 'antd';
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
  const [indicatorScore, setIndicatorScore] = useState(null);

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

  useEffect(() => {
    if (selectedDirection) {
      const selectedDir = directions.find(dir => dir.id === selectedDirection);
      setCriteria(selectedDir ? selectedDir.criteria : []);
      setSelectedCriteria(null);
      setIndicators([]);
      setSelectedIndicator(null);
      setIndicatorScore(null);
    }
  }, [selectedDirection, directions]);

  useEffect(() => {
    if (selectedCriteria) {
      const selectedCrit = criteria.find(crit => crit.id === selectedCriteria);
      setIndicators(selectedCrit ? selectedCrit.indicators : []);
      setSelectedIndicator(null);
      setIndicatorScore(null);
    } else {
      setIndicators([]);
    }
  }, [selectedCriteria, criteria]);

  const handleIndicatorChange = (indicatorId) => {
    setSelectedIndicator(indicatorId);

    if (indicatorId) {
      const selectedInd = indicators.find(ind => ind.id === indicatorId);
      if (selectedInd) {
        setIndicatorScore(selectedInd.points);
      } else {
        setIndicatorScore(null);
      }
    } else {
      setIndicatorScore(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://monitor-mmlp.onrender.com/api/filter-teachers/', {
        params: {
          direction_id: selectedDirection,
          criteria_id: selectedCriteria,
          indicator_id: selectedIndicator
        }
      });
      console.log(response.data); // Логируем ответ от сервера для проверки
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      setLoading(false);
    }
  };

  // Логируем данные перед рендером таблицы
  useEffect(() => {
    console.log('Data:', data); // Логируем данные перед рендером таблицы
  }, [data]);

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
    {
      title: 'Баллы по направлению',
      dataIndex: 'direction_score',
      key: 'direction_score',
    },
    {
      title: 'Баллы по критерию',
      dataIndex: 'criteria_score',
      key: 'criteria_score',
    },
    {
      title: 'Баллы по показателю',
      dataIndex: 'indicator_score',
      key: 'indicator_score',
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>Фильтр по показателям</Title>
      <p>Вы можете выбрать интересующие вас показатели, чтобы отобразить только соответствующие данные.</p>

      <Card style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: 10 }}>
          <Select
            placeholder="Выберите направление"
            style={{ width: 200, marginRight: 10 }}
            onChange={setSelectedDirection}
            value={selectedDirection}
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
            onChange={handleIndicatorChange}
            value={selectedIndicator}
            disabled={!selectedCriteria}
            allowClear
          >
            {indicators.map((ind) => (
              <Option key={ind.id} value={ind.id}>{ind.title}</Option>
            ))}
          </Select>
        </div>

        {indicatorScore !== null && (
          <div style={{ marginTop: 10 }}>
            <span style={{ fontWeight: 'bold' }}>Баллы за выбранный показатель:</span>{' '}
            <span style={{ fontSize: '18px', color: '#1890ff' }}>{indicatorScore} баллов</span>
          </div>
        )}

        <Button type="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
          Применить фильтры
        </Button>
      </Card>

      {loading ? (
        <Spin size="large" />
      ) : (
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
