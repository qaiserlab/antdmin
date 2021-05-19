import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Layout, Space, Modal, Drawer, Button } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

import style from './style.module.scss';
import { ActivityStore } from '@stores/ActivityStore';
import { AuthStore } from '@stores/AuthStore';
import UrlBreadcrumb from '@components/UrlBreadcrumb';
import RootLayout from '@layouts/RootLayout';
import SideMenu from '@bound/SideMenu';
import DrawerMenu from '@bound/DrawerMenu';
import AlertMessage from '@bound/AlertMessage';

const { Header, Content, Footer, Sider } = Layout;

export default function AppLayout({ children }: any) {
  const router = useRouter();
  const pathName = router.pathname;
  const xPathName = pathName.split('/[');
  const pathOnly = (xPathName.length >= 1)?xPathName[0]:'/';

  const { confirmBox, setConfirmBox } = useContext(ActivityStore);
  const { state } = useContext(AuthStore);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

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

                <Button 
                  icon={<SettingOutlined />} 
                  onClick={() => setIsDrawerVisible(true)}
                  ghost
                />

                <Drawer
                  title={'Settings'}
                  onClose={() => setIsDrawerVisible(false)}
                  visible={isDrawerVisible}
                >
                  <DrawerMenu />
                </Drawer>
              </Space>
            </figure>
          </Header>
          <Content id={style.content}>
            <header>
              <UrlBreadcrumb url={pathOnly} icon={<DashboardOutlined />} />
            </header>
            <section>
              <AlertMessage />
              {children}
            </section>
          </Content>

          <Footer id={style.footer}>
            Next.js Admin ©2021 Created by QaiserLab/Fadlun Anaturdasa Wibawa
          </Footer>
        </Layout>
      </Layout>

      <Modal 
        title="Confirm" 
        visible={confirmBox.isVisible} 
        onOk={() => { if (confirmBox.onOk) confirmBox.onOk() }} 
        onCancel={() => setConfirmBox({...confirmBox, isVisible: false })}
      >
        <p>{confirmBox.message}</p>
      </Modal>
    </RootLayout>
  )
}