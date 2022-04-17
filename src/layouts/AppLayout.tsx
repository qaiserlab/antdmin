import { useState } from 'react'
import { useRouter } from 'next/router'
import { Layout, Space, Drawer, Button } from 'antd'
import { DashboardOutlined, MenuOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons'

import UrlBreadcrumb from '@components/UrlBreadcrumb'
import RootLayout from '@layouts/RootLayout'
import UserInfo from '@widgets/UserInfo'
import MainMenu from '@widgets/MainMenu'
import SettingMenu from '@widgets/SettingMenu'
import ServerAlert from '@widgets/ServerAlert'

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
      <Layout id={'app'}>
        <Sider
          id={'sider'} 
          collapsed={isCollapsed} 
          onCollapse={() => setIsCollapsed(!isCollapsed)}
          breakpoint={'sm'}
          onBreakpoint={handleBreakpoint}
          collapsedWidth={collapsedWidth}
          trigger={null}
        >
          <MainMenu />
        </Sider>

        <Layout>
          <Header id={'header'}>
            <Button 
              className={'toggler'}
              icon={isCollapsed?<MenuOutlined />:<CloseOutlined />} 
              onClick={() => setIsCollapsed(!isCollapsed)}
              ghost
            />

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
                  <SettingMenu />
                </Drawer>
              </Space>
            </figure>
          </Header>
          <Content id={'content'}>
            <header style={{textAlign: breadcrumbAlign}}>
              <UrlBreadcrumb url={pathOnly} icon={<DashboardOutlined />} />
            </header>
            <section>
              <ServerAlert />
              {children}
            </section>
          </Content>

          <Footer id={'footer'}>
            Next.js Admin ©2021 Created by QaiserLab/Fadlun Anaturdasa Wibawa
          </Footer>
        </Layout>
      </Layout>
    </RootLayout>
  )
}