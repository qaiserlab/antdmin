import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { Modal } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'

import DataMenu from '@components/DataMenu'
import { AuthStore } from '@stores/AuthStore'
import { menus } from '@stores/DrawerMenu'

const { confirm } = Modal

export default function DrawerMenu() {
  const router = useRouter()

  let selectedKey = router.pathname
  const xSelectedKey = selectedKey.split('/')
  let openKey = (xSelectedKey.length >= 2)?`/${xSelectedKey[1]}`:''

  const { dispatch } = useContext(AuthStore)
  
  const handleSelect = ({ key }) => {
    if (key === '/logout') {
      return confirm({
        title: 'Confirm',
        icon: <QuestionOutlined />,
        content: 'Logout from Application?',
        onOk: () => {
          dispatch({ type: 'logout' })
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
        dataSource={menus} 
        onSelect={handleSelect} 
        defaultOpenKeys={[openKey]}
        defaultSelectedKeys={[selectedKey]}
      />
    </React.Fragment>
  )
}
