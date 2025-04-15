import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Typography, Spin, Table } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const Dashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedCriterion, setSelectedCriterion] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://monitor-mmlp.onrender.com/api/best-teachers/');
        setTeachers(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Список всех направлений и критериев
  const allDirections = Array.from(new Set(
    teachers.flatMap(t => t.directions.map(d => `${d.direction_id}|${d.direction_title}`))
  ));

  const allCriteria = Array.from(new Set(
    teachers.flatMap(t =>
      t.directions.flatMap(d =>
        d.criteria.map(c => `${c.criteria_id}|${c.criteria_title}`)
      )
    )
  ));

  // Обработка таблицы
  const dataSource = teachers.map(t => {
    let directionScore = 0;
    let criterionScore = 0;

    t.directions.forEach(d => {
      if (selectedDirection && d.direction_id === parseInt(selectedDirection)) {
        directionScore = d.total_score;
      }
      if (selectedCriterion) {
        const crit = d.criteria.find(c => c.criteria_id === parseInt(selectedCriterion));
        if (crit) {
          criterionScore = crit.score;
        }
      }
    });

    return {
      key: t.id,
      name: t.username,
      directionScore,
      criterionScore,
    };
  }).filter(t => {
    // Показываем только тех, у кого есть хотя бы один балл
    return (selectedDirection ? t.directionScore > 0 : true) &&
           (selectedCriterion ? t.criterionScore > 0 : true);
  }).sort((a, b) => {
    // Сортировка по сумме выбранных баллов
    const aScore = (selectedDirection ? a.directionScore : 0) + (selectedCriterion ? a.criterionScore : 0);
    const bScore = (selectedDirection ? b.directionScore : 0) + (selectedCriterion ? b.criterionScore : 0);
    return bScore - aScore;
  });

  const columns = [
    {
      title: 'Учитель',
      dataIndex: 'name',
      key: 'name',
    },
    selectedCriterion && {
      title: 'Балл за критерий',
      dataIndex: 'criterionScore',
      key: 'criterionScore',
    },
    selectedDirection && {
      title: 'Балл за направление',
      dataIndex: 'directionScore',
      key: 'directionScore',
    },
  ].filter(Boolean); // удаляем null если что-то не выбрано

  if (loading) return <Spin size="large" />;

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Рейтинг преподавателей</Title>

      <div style={{ marginBottom: 20 }}>
        <Text strong>Выбери направление:</Text>
        <Select
          style={{ width: 400, marginLeft: 10 }}
          allowClear
          placeholder="Направление"
          onChange={(value) => {
            setSelectedDirection(value);
          }}
        >
          {allDirections.map(d => {
            const [id, title] = d.split('|');
            return <Option key={id} value={id}>{title}</Option>;
          })}
        </Select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <Text strong>Выбери критерий:</Text>
        <Select
          style={{ width: 400, marginLeft: 10 }}
          allowClear
          placeholder="Критерий"
          onChange={(value) => {
            setSelectedCriterion(value);
          }}
        >
          {allCriteria.map(c => {
            const [id, title] = c.split('|');
            return <Option key={id} value={id}>{title}</Option>;
          })}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default Dashboard;
