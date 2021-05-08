import { useState, ReactChildren } from 'react';
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

import SideMenu from '@views/SideMenu';

interface AuxProps {
  children: ReactChildren;
};

export default function AppLayout({ children }: AuxProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [url, setUrl] = useState('/test/address/next');

  return (
    <RootLayout>
      <Layout id={style.root}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <SideMenu />
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