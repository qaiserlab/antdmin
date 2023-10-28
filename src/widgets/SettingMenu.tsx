import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { Modal } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'

import config from '@config/AllConfig'
import { ActivityStore } from '@stores/ActivityStore'
import DataMenu from '@components/DataMenu/DataMenu'

const { confirm } = Modal

export default function SettingMenu() {
  const { logout } = useContext(ActivityStore)

  const router = useRouter()

  let selectedKey = router.pathname
  const xSelectedKey = selectedKey.split('/')
  let openKey = (xSelectedKey.length >= 2)?`/${xSelectedKey[1]}`:''

  const handleSelect = ({ key }) => {
    if (key === '/logout') {
      return confirm({
        title: 'Confirm',
        icon: <QuestionOutlined />,
        content: 'Logout from Application?',
        onOk: () => {
          logout()
          router.push('/login')
        },
      })
    }
    
    router.push(key)
  }

  return (
    <React.Fragment>
      <DataMenu 
        theme={'light'} 
        mode={'inline'} 
        dataSource={config.settingMenu} 
        onSelect={handleSelect} 
        defaultOpenKeys={[openKey]}
        defaultSelectedKeys={[selectedKey]}
      />
    </React.Fragment>
  )
}
