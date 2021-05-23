import React, { useContext } from 'react';

import { Alert } from 'antd';
// import { WarningOutlined } from '@ant-design/icons';

import { ActivityStore } from '@stores/ActivityStore';

export default function AppLayout({ children }: any) {
  const { serverResult, setServerResult } = useContext(ActivityStore);
  const message = 'Please correct following errors;';

  let isError = false;
  let type:any = '';
  let description:any = serverResult.message;

  if (
    serverResult.code === 422 || 
    serverResult.code === 404 || 
    serverResult.code === 400 || 
    serverResult.code === 500) {
    isError = true;

    switch (serverResult.code) {
      case 422:
        type = 'warning';

        description = (
          <ul>
            {Object.keys(serverResult.errors).map(
              (key: any) => serverResult.errors[key] && <li>{serverResult.errors[key]}</li>
            )}
          </ul>
        );

        break;
      default:
        type = 'error';
    }
  }
  
  return (
    <React.Fragment>
      {isError && 
        <Alert
          message={message}
          description={description}
          type={type} // success, info, warning, error
          onClose={() => setServerResult({ code: -1, message: '', errors: {} })}
          style={{marginBottom: '16px'}}
          closable
        />
      }
    </React.Fragment>
  )
}