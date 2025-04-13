import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// ✅ Получение всех направлений
export const getDirections = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/directions/`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке направлений:', error);
  }
};

// ✅ Получение всех показателей
export const getIndicators = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/indicators/`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке показателей:', error);
  }
};

// ✅ Получение привязанных показателей (баллы учителя)
export const getMyScores = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/my-scores/`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке баллов:', error);
  }
};

// ✅ Привязка показателей к учителю
export const assignIndicators = async (teacherId, indicators) => {
  try {
    const response = await axios.post(`${API_URL}/api/assign/`, {
      teacher: teacherId,
      indicators: indicators
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при привязке показателей:', error);
  }
};

// ✅ Тестовый запрос направлений
const fetchTestDirections = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/test-directions/`);
    console.log('Направления:', response.data);
  } catch (error) {
    console.error('Ошибка при запросе направлений:', error);
  }
};

fetchTestDirections();

// ✅ Авторизация
export const loginUser = async (credentials) => {
  try {
    console.log('⏳ Отправка логина...', credentials);
    const response = await axios.post(`https://monitor-mmlp.onrender.com/api/login/`, credentials);
    console.log('✅ Ответ от сервера:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка авторизации:');
    if (error.response) {
      console.error('📦 Ответ от сервера:', error.response.data);
      console.error('🔢 Статус:', error.response.status);
    } else if (error.request) {
      console.error('📡 Запрос был отправлен, но нет ответа:', error.request);
    } else {
      console.error('💥 Ошибка при настройке запроса:', error.message);
    }
    throw error;
  }
};


