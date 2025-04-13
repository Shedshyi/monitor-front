import React from 'react';
import { Typography, Table, Card } from 'antd';

const { Title, Paragraph } = Typography;

// Структура колонок
const columns = [
  {
    title: 'Направления научно-методической работы',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Критерии',
    dataIndex: 'criterion',
    key: 'criterion',
  },
  {
    title: 'Показатели',
    dataIndex: 'indicator',
    key: 'indicator',
  },
  {
    title: 'Баллы',
    dataIndex: 'points',
    key: 'points',
  },
];

// Данные таблицы
const data = [
  // 📚 Качественные показатели
  {
    key: '1',
    category: '📚 Качественные показатели',
    criterion: 'Наличие диплома об образовании',
    indicator: 'Бакалавр',
    points: '1 балл',
  },
  {
    key: '2',
    category: '',
    criterion: '',
    indicator: 'Магистр',
    points: '2 балла',
  },
  {
    key: '3',
    category: '',
    criterion: 'Наличие педагогического стажа',
    indicator: '0-5 лет',
    points: '1 балл',
  },
  {
    key: '4',
    category: '',
    criterion: '',
    indicator: '6-10 лет',
    points: '2 балла',
  },
  {
    key: '5',
    category: '',
    criterion: '',
    indicator: '11-15 лет',
    points: '3 балла',
  },
  {
    key: '6',
    category: '',
    criterion: '',
    indicator: '16-20 лет',
    points: '4 балла',
  },
  {
    key: '7',
    category: '',
    criterion: '',
    indicator: '21-25 лет',
    points: '5 баллов',
  },
  {
    key: '8',
    category: '',
    criterion: '',
    indicator: '25 лет и выше',
    points: '6 баллов',
  },
  {
    key: '9',
    category: '',
    criterion: 'Наличие квалификационной категории',
    indicator: 'Педагог-мастер',
    points: '4 балла',
  },
  {
    key: '10',
    category: '',
    criterion: '',
    indicator: 'Педагог-исследователь',
    points: '3 балла',
  },
  {
    key: '11',
    category: '',
    criterion: '',
    indicator: 'Педагог-эксперт',
    points: '2 балла',
  },
  {
    key: '12',
    category: '',
    criterion: '',
    indicator: 'Педагог-модератор',
    points: '1 балл',
  },
  {
    key: '13',
    category: '📄 Курсы повышения квалификации',
    criterion: 'Наличие сертификата прохождения курсов',
    indicator: 'Один курс ПК',
    points: '1 балл',
  },
  {
    key: '14',
    category: '',
    criterion: '',
    indicator: 'Более 1 курса ПК',
    points: '2 балла',
  },

  // 🔬 Исследовательская деятельность
  {
    key: '15',
    category: '🔬 Исследовательская деятельность учителя',
    criterion: 'Чётко сформулированные цели и задачи',
    indicator: 'Соответствие запросам обучающихся и стандартам',
    points: '1 балл',
  },
  {
    key: '16',
    category: '',
    criterion: '',
    indicator: 'План работы утверждён и согласован',
    points: '1 балл',
  },
  {
    key: '17',
    category: '',
    criterion: '',
    indicator: 'Наличие ключевых этапов (обучение, апробация, внедрение)',
    points: '1 балл',
  },
  {
    key: '18',
    category: '',
    criterion: '',
    indicator: 'Наличие анализа научной литературы и педагогических исследований',
    points: '1 балл',
  },
  {
    key: '19',
    category: '',
    criterion: '',
    indicator: 'Использование ресурсов цифровизации (если применимо)',
    points: '1 балл',
  },
  {
    key: '20',
    category: '',
    criterion: 'Внедрение элементов методической темы',
    indicator: 'Разработка и проведение уроков',
    points: '2 балла',
  },
  {
    key: '21',
    category: '',
    criterion: '',
    indicator: 'Проведение открытых уроков и мастер-классов',
    points: '2 балла',
  },
  {
    key: '22',
    category: '',
    criterion: '',
    indicator: 'Публикации в педагогических изданиях',
    points: '2 балла',
  },
  {
    key: '23',
    category: '',
    criterion: 'Достижение запланированных результатов',
    indicator: 'Выполнение всех поставленных целей',
    points: '3 балла',
  },
  {
    key: '24',
    category: '',
    criterion: '',
    indicator: 'Наличие рефлексивных отчётов',
    points: '3 балла',
  },

  // 📄 Публикации
  {
    key: '25',
    category: '📄 Публикации на основе исследований',
    criterion: 'Статья в сборниках конференций',
    indicator: 'Областной уровень',
    points: '2 балла',
  },
  {
    key: '26',
    category: '',
    criterion: '',
    indicator: 'Республиканский уровень',
    points: '4 балла',
  },
  {
    key: '27',
    category: '',
    criterion: '',
    indicator: 'Международный уровень',
    points: '6 баллов',
  },

  // 🏆 Участие в конкурсах
  {
    key: '28',
    category: '🏆 Участие в конкурсах и олимпиадах',
    criterion: 'Сертификат за участие',
    indicator: 'Областной уровень',
    points: '2 балла',
  },
  {
    key: '29',
    category: '',
    criterion: '',
    indicator: 'Республиканский уровень',
    points: '4 балла',
  },
  {
    key: '30',
    category: '',
    criterion: '',
    indicator: 'Международный уровень',
    points: '6 баллов',
  },
];

const ScoreSystem = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title>📊 Как начисляются баллы?</Title>
        <Paragraph style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
          Полная информация о системе оценки достижений учителей.
        </Paragraph>
      </div>

      {/* Таблица */}
      <Card style={{ marginBottom: '40px', borderRadius: '12px' }}>
        <Table columns={columns} dataSource={data} pagination={false} bordered />
      </Card>
    </div>
  );
};

export default ScoreSystem;

// import React from 'react';
// import { Typography } from 'antd';

// const { Title, Paragraph } = Typography;

// const ScoreSystem = () => {
//   return (
//     <div style={{ textAlign: 'center', marginBottom: '40px' }}>
//       <Title>📊 Критерии и Показатели</Title>
//       <Paragraph>
//         На этой странице вы можете ознакомиться с полной системой оценки.
//       </Paragraph>

//       {/* Убираем ограничения и делаем iframe на всю ширину */}
//       <div style={{ width: '60vw', height: '100vh', backgroundColor: '#fff' }}>
//         <iframe
//           src="/criteria.html"
//           title="Критерии и Показатели"
//           style={{
//             width: '100%',
//             height: '100%',
//             border: 'none',
//             overflow: 'auto',
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ScoreSystem;
