import React from 'react'
import { useRouter } from 'next/router'

import config from '@config/AllConfig'
import DataMenu from '@components/DataMenu/DataMenu'

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
      <DataMenu 
        theme={'dark'} 
        mode={'inline'} 
        dataSource={config.mainMenu} 
        onSelect={handleSelect} 
        defaultOpenKeys={[openKey]}
        defaultSelectedKeys={[selectedKey]}
      />
    </React.Fragment>
  )
}
