import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import { Layout, Space } from 'antd';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

import style from './style.module.scss';

import { AuthStore } from '@stores/AuthReducer';
import UrlBreadcrumb from '@components/UrlBreadcrumb';
import RootLayout from '@layouts/RootLayout';
import SideMenu from '@views/SideMenu';

export default function AppLayout({ children }: any) {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthStore);
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <RootLayout>
      <Layout id={style.root}>
        <Sider collapsible collapsed={isCollapsed} onCollapse={() => setIsCollapsed(!isCollapsed)}>
          <SideMenu />
        </Sider>

        <Layout>
          <Header id={style.header}>
            <figure>
              <Space>
                <UserOutlined />
                {state.userInfo.userName}
              </Space>
            </figure>
          </Header>
          <Content id={style.content}>
            <header>
              <UrlBreadcrumb url={router.pathname} icon={<DashboardOutlined />} />
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