import { useState } from 'react'
import { useRouter } from 'next/router'
import { Layout, Space, Drawer, Button } from 'antd'
import { DashboardOutlined, SettingOutlined } from '@ant-design/icons'

import style from './style.module.scss'
import UrlBreadcrumb from '@components/UrlBreadcrumb'
import RootLayout from '@layouts/RootLayout'
import UserInfo from 'widgets/UserInfo'
import SideMenu from 'widgets/SideMenu'
import DrawerMenu from 'widgets/DrawerMenu'
import AlertMessage from 'widgets/AlertMessage'

const { Header, Content, Footer, Sider } = Layout

export default function AppLayout({ children }: any) {
  const router = useRouter()
  const pathName = router.pathname
  const xPathName = pathName.split('/[')
  const pathOnly = (xPathName.length >= 1)?xPathName[0]:'/'
  const defaultCollapsedWidth = 240

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [collapsedWidth, setCollapsedWidth] = useState(defaultCollapsedWidth)
  const [breadcrumbAlign, setBreadcrumbAlign] = useState('left' as 'left' | 'right')

  const handleBreakpoint = (broken: boolean) => {
    if (!broken) {
      setBreadcrumbAlign('left')
      setCollapsedWidth(defaultCollapsedWidth)
    }
    else {
      setBreadcrumbAlign('right')
      setCollapsedWidth(0)
    }
  }

  return (
    <RootLayout>
      <Layout id={style.root}>
        <Sider
          id={style.sider} 
          collapsed={isCollapsed} 
          onCollapse={() => setIsCollapsed(!isCollapsed)}
          breakpoint={'sm'}
          onBreakpoint={handleBreakpoint}
          collapsedWidth={collapsedWidth}
        >
          <SideMenu />
        </Sider>

        <Layout>
          <Header id={style.header}>
            <figure>
              <Space>
                <UserInfo />

                <Button 
                  icon={<SettingOutlined />} 
                  onClick={() => setIsDrawerVisible(true)}
                  ghost
                />

                <Drawer
                  title={'Settings'}
                  bodyStyle={{ padding: 0 }}
                  onClose={() => setIsDrawerVisible(false)}
                  visible={isDrawerVisible}
                >
                  <DrawerMenu />
                </Drawer>
              </Space>
            </figure>
          </Header>
          <Content id={style.content}>
            <header style={{textAlign: breadcrumbAlign}}>
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
    </RootLayout>
  )
}