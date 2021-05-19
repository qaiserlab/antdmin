import React from 'react';
import { useRouter } from 'next/router'

import DataMenu from '@components/DataMenu';
import { menus } from '@stores/DrawerMenu';

export default function DrawerMenu() {
  const router = useRouter();
  const selectedKey = router.pathname;
  const xSelectedKey = selectedKey.split('/');
  const openKey = (xSelectedKey.length >= 2)?`/${xSelectedKey[1]}`:'';

  const handleSelect = ({ key }) => {
    if (key === '/account/logout') {
      if (confirm('Logout from Application?')) {
        // Logout action here...
      }
      
      return;
    }

    router.push(key);
  };

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
  );
}
