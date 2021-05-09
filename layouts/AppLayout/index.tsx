import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import { Layout } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

import style from './style.module.scss';

import { authStore } from '@reducers/AuthReducer';
import UrlBreadcrumb from '@components/UrlBreadcrumb';
import RootLayout from '@layouts/RootLayout';
import SideMenu from '@views/SideMenu';

export default function AppLayout({ children }: any) {
  const router = useRouter();
  const { state, dispatch } = useContext(authStore);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => {
    const token = '727f3d03-52e3-43d2-af80-1c3912c45194';
    const userInfo = {
      userName: 'qaiserlab',
      email: 'f.anaturdasa@gmail.com',
    };

    dispatch({
      type: 'login',
      payload: {
        authInfo: { token },
        userInfo: userInfo,
      }
    })
  };

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
              {JSON.stringify(state)}
              <button onClick={handleClick}>Test</button>
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