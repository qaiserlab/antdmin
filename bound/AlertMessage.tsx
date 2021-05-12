import React, { useContext } from 'react';

import { Alert } from 'antd';
// import { WarningOutlined } from '@ant-design/icons';

import { ActivityStore } from '@stores/ActivityStore';

export default function AppLayout({ children }: any) {
  const { errorMessage, setErrorMessage } = useContext(ActivityStore);
  
  return (
    <React.Fragment>
      {errorMessage && 
        <Alert
          message={errorMessage}
          type={'error'} // success, info, warning, error
          onClose={() => setErrorMessage('')}
          style={{marginBottom: '16px'}}
          closable
        />
      }
    </React.Fragment>
  )
}