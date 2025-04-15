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
    }
  }, [selectedDirection, directions]);

  useEffect(() => {
    if (selectedCriteria) {
      const selectedCrit = criteria.find(crit => crit.id === selectedCriteria);
      setIndicators(selectedCrit ? selectedCrit.indicators : []);
      setSelectedIndicator(null);
    } else {
      setIndicators([]);
    }
  }, [selectedCriteria, criteria]);

  const handleIndicatorChange = (indicatorId) => {
    setSelectedIndicator(indicatorId);
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
      setData(response.data);
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
