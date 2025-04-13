import React from 'react';
import { Layout as AntLayout } from 'antd';
import Header from './Header.js';
import Footer from './Footer.js';

const { Content } = AntLayout;

const Layout = ({ children }) => (
  <AntLayout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
    <Header />
    <Content style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {children}
    </Content>
    <Footer />
  </AntLayout>
);

export default Layout;
