import React from 'react';

import DataMenu from '@components/DataMenu';
import { menus } from './schema';

export default function SideMenu() {

  const handleSelect = ({ key }) => {
    alert('key: ' + key);
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
