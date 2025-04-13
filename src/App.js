import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import Home from './pages/Home.js';
import ScoreSystem from './pages/ScoreSystem.js';
import Dashboard from './pages/Dashboard.js';
import About from './pages/About.js';
import Auth from './pages/Auth.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import UsersList from './pages/UsersList.js';
import UserProfile from './pages/UserProfile.js';
import Achievements from './pages/Achievements.js';


import 'antd/dist/reset.css'; // Подключение Ant Design


const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/score-system" element={<ScoreSystem />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
