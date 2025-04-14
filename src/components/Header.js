// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Typography } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);

  // Элементы меню
  const items = [
    { key: '/score-system', label: '📊 Разбалловка' },
    { key: '/about', label: 'ℹ️ О нас' },
    { key: '/achievements', label: '🗂️ Фильтр' },
    { key: '/dashboard', label: '📈 Дашборд' },
    { key: '/users', label: '👥 Учителя' },
  ];

  // Проверяем, есть ли пользователь при загрузке компонента
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Функция выхода из системы
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login'); // Перенаправляем на страницу входа
  };

  return (
    <AntHeader
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#4C668A',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '0 20px',
      }}
    >
      {/* Логотип с переходом на главную */}
      <div
        onClick={() => navigate('/')}
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#ffffff',
          cursor: 'pointer',
        }}
      >
        🖥️ Monitoring System
      </div>

      {/* Меню на десктопе */}
      <div className="desktop-menu">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            borderBottom: 'none',
            background: 'transparent',
            color: '#ffffff',
          }}
        >
          {items.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.key} style={{ color: '#ffffff' }}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}

          {/* Если пользователь не авторизован — показываем "Войти" */}
          {!user && (
            <Menu.Item key="/login">
              <Link to="/login" style={{ color: '#ffffff' }}>
                🔐 Войти
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </div>

      {/* Мобильное меню */}
      <Button
        className="mobile-menu-btn"
        type="text"
        icon={<MenuOutlined style={{ color: '#ffffff' }} />}
        onClick={() => setVisible(true)}
      />

      {/* Drawer (выпадающее меню) */}
      <Drawer
        title="Меню"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width={250}
      >
        {items.map((item) => (
          <p key={item.key}>
            <Link to={item.key} onClick={() => setVisible(false)}>
              {item.label}
            </Link>
          </p>
        ))}

        {/* Если пользователь авторизован — показываем имя и "Выйти" */}
        {user ? (
          <>
            <p>
              <Text strong>👤 {user.username}</Text>
            </p>
            <Button type="primary" danger onClick={handleLogout}>
              Выйти
            </Button>
          </>
        ) : (
          <p>
            <Link to="/login" onClick={() => setVisible(false)}>
              🔐 Войти
            </Link>
          </p>
        )}
      </Drawer>

      {/* Если пользователь авторизован — показываем имя и "Выйти" для десктопа */}
      <div className="desktop-user-info">
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
              👤 {user.username}
            </Link>
            <Button type="primary" danger onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
