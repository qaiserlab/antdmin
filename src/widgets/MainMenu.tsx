import React from 'react'
import { useRouter } from 'next/router'

import mainMenus from '@config/mainMenus'
import CDataMenu from '@components/CDataMenu/CDataMenu'

export default function MainMenu() {
  const router = useRouter()
  const selectedKey = router.pathname
  const xSelectedKey = selectedKey.split('/')
  const openKey = (xSelectedKey.length >= 2)?`/${xSelectedKey[1]}`:''

  const handleSelect = ({ key }) => {
    router.push(key)
  }

  return (
    <React.Fragment>
      <CDataMenu 
        theme={'dark'} 
        mode={'inline'} 
        dataSource={mainMenus} 
        onSelect={handleSelect} 
        defaultOpenKeys={[openKey]}
        defaultSelectedKeys={[selectedKey]}
      />
    </React.Fragment>
  )
}
