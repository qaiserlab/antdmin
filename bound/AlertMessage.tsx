import React, { useContext, useEffect } from 'react';

import { Alert, notification } from 'antd';
// import { WarningOutlined } from '@ant-design/icons';

import { ActivityStore } from '@stores/ActivityStore';

export default function AlertMessage({ children }: any) {
  const { serverResult, setServerResult } = useContext(ActivityStore);
  const message = 'Please correct following errors;';

  let isError = false;
  let type:any = '';
  let description:any = serverResult.message;

  switch (serverResult.code) {
    case 422:
      isError = true;
      type = 'warning';

      description = (
        <ul>
          {Object.keys(serverResult.errors).map(
            (key: any) => serverResult.errors[key] && <li>{serverResult.errors[key]}</li>
          )}
        </ul>
      );
   
      break;
    case 404:
    case 400:
    case 500:
      isError = true; 
      type = 'error';
      break;
  }

  useEffect(() => {
    if (serverResult.code === 200) {
      notification.success({ 
        message: 'Success', 
        description: serverResult.message,
      });
      setServerResult({ code: -1, message: '', errors: {} });
    }
  }, [serverResult.code])
    
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