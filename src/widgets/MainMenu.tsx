import React from 'react'
import { useRouter } from 'next/router'

import useMainMenuConfig from '@config/useMainMenuConfig'
import DataMenu from '@components/DataMenu/DataMenu'

export default function MainMenu() {
  const mainMenuConfig = useMainMenuConfig()
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
        dataSource={mainMenuConfig} 
        onSelect={handleSelect} 
        defaultOpenKeys={[openKey]}
        defaultSelectedKeys={[selectedKey]}
      />
    </React.Fragment>
  )
}
