import React from 'react';
import { useRouter } from 'next/router'

import DataMenu from '@components/DataMenu';
import { menus } from './schema';

export default function SideMenu() {
  const router = useRouter();

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
        theme={'dark'} 
        mode={'inline'} 
        dataSource={menus} 
        onSelect={handleSelect} 
      />
    </React.Fragment>
  );
}
