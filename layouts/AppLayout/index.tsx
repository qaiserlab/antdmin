import { useState } from 'react';
import { useRouter } from 'next/router';

import { Layout } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

import style from './style.module.scss';

import UrlBreadcrumb from '@components/UrlBreadcrumb';
import RootLayout from '@layouts/RootLayout';

import SideMenu from '@views/SideMenu';

export default function AppLayout({ children }: any) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <RootLayout>
      <Layout id={style.root}>
        <Sider collapsible collapsed={isCollapsed} onCollapse={() => setIsCollapsed(!isCollapsed)}>
          <SideMenu />
        </Sider>

        <Layout>
          <Header id={style.header} />
          
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