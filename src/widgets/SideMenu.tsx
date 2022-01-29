import React from 'react'
import { useRouter } from 'next/router'

import sideMenus from '@config/sideMenus'
import DataMenu from '@components/DataMenu'

export default function SideMenu() {
  const router = useRouter()
  const selectedKey = router.pathname
  const xSelectedKey = selectedKey.split('/')
  const openKey = (xSelectedKey.length >= 2)?`/${xSelectedKey[1]}`:''

  const handleSelect = ({ key }) => {
    router.push(key)
  }

  return (
    <React.Fragment>
      <DataMenu 
        theme={'dark'} 
        mode={'inline'} 
        dataSource={sideMenus} 
        onSelect={handleSelect} 
        defaultOpenKeys={[openKey]}
        defaultSelectedKeys={[selectedKey]}
      />
    </React.Fragment>
  )
}
