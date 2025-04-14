import React from 'react';
import { Layout, Row, Col, Card, Typography, Divider } from 'antd';
import {
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  MailOutlined,
  TeamOutlined,
  UserOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import './About.css';

const { Title, Paragraph, Text } = Typography;

const About = () => {
  return (
    <Layout.Content style={{ padding: '40px', backgroundColor: '#f4f6f9' }}>
      <Row gutter={[32, 32]}>
        {/* Контактная информация */}
        <Col xs={24} md={12}>
          <Card
            title="Контакты"
            bordered={false}
            style={{
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              background: '#ffffff',
            }}
          >
            <Paragraph>
              <EnvironmentOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
              Костанайская область, г. Костанай, ул. Ы. Алтынсарина, д. 118
            </Paragraph>
            <Paragraph>
              <PhoneOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
              8 7142 54 56 94
            </Paragraph>
            <Paragraph>
              <MailOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
              shodaltynsarin@edu.kz
            </Paragraph>
            <Paragraph>
              <GlobalOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
              <a href="http://shodaltynsarin.edu.kz" target="_blank" rel="noreferrer">
                http://shodaltynsarin.edu.kz
              </a>
            </Paragraph>
          </Card>
        </Col>

        {/* Карта */}
        <Col xs={24} md={12}>
          <Card
            title="Наше местоположение"
            bordered={false}
            style={{
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              background: '#ffffff',
            }}
          >
            <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
              <iframe
                width="100%"
                height="300"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=ru&amp;q=Костанай,%20ул.%20Ыбырай%20Алтынсарина%20118+(Школа)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Kostanay Map"
              ></iframe>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Общая информация */}
      <Row gutter={[32, 32]} style={{ marginTop: '40px' }}>
        <Col span={24}>
          <Card
            title="О школе"
            bordered={false}
            style={{
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              background: '#ffffff',
            }}
          >
            <Typography>
              <Title level={4}>КГУ «Специализированная школа-гимназия-интернат им. Ы. Алтынсарина»</Title>

              <Paragraph>
                <Text strong>Год основания:</Text> 1884 год <br />
                <Text strong>Год постройки здания:</Text> 1966 год
              </Paragraph>

              <Divider />

              <Paragraph>
                <Text strong>Директор:</Text> Келинбердиева Ырсалды Сиелхановна (с 2017 года)
              </Paragraph>

              <Paragraph>
                <Text strong>Официальные страницы в соцсетях:</Text>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>
                    Facebook: <Text code>shod.yaltynsarin</Text>
                  </li>
                  <li>
                    Instagram: <Text code>ybyrai.mektep</Text>
                  </li>
                </ul>
              </Paragraph>

              <Divider />

              <Title level={5}>Контингент учащихся</Title>
              <Paragraph>
                <TeamOutlined style={{ marginRight: '8px' }} />
                Общий контингент: 370 учащихся <br />
                <UserOutlined style={{ marginRight: '8px' }} />
                Проживают в интернате: 230 учащихся
              </Paragraph>

              <Divider />

              <Title level={5}>Кадровый состав</Title>
              <Paragraph>
                <Text strong>Всего педагогов:</Text> 42 <br />
                <Text strong>С высшим образованием:</Text> 41 <br />
                <Text strong>Магистров:</Text> 9
              </Paragraph>

              <Paragraph>
                <Text strong>Квалификации:</Text>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Педагог-исследователь — 21</li>
                  <li>Педагог-эксперт — 4</li>
                  <li>Педагог-модератор — 9</li>
                  <li>Педагог — 8</li>
                </ul>
              </Paragraph>

              <Paragraph>
                <TrophyOutlined style={{ marginRight: '8px' }} />
                <Text strong>Награды:</Text>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Нагрудный знак Ы. Алтынсарина — 4 педагога</li>
                  <li>«Заслуженный работник образования РК» — 1 педагог</li>
                  <li>«Заслуженный учитель Казахстана» — 1 педагог</li>
                </ul>
              </Paragraph>
            </Typography>
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default About;
