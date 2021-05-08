import { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DashboardOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import style from './style.module.scss';

import UrlBreadcrumb from '@components/UrlBreadcrumb';
import RootLayout from '@layouts/RootLayout';

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const [url, setUrl] = useState('/test/address/next');

  return (
    <RootLayout>
      <Layout id={style.root}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header id={style.header} />
          
          <Content id={style.content}>
            <header>
              <UrlBreadcrumb url={url} icon={<DashboardOutlined />} />
            </header>
            <section>
              {children}
            </section>
          </Content>

          <Footer id={style.footer}>
            Next.js Admin ©2021 Created by QaiserLab/Fadlun Anaturdasa Wibawa
          </Footer>
        </Layout>
      </Layout>
    </RootLayout>
  )
}