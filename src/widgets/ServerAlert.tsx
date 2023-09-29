import React, { useContext, useEffect } from 'react'

import { Alert, notification } from 'antd'
// import { WarningOutlined } from '@ant-design/icons'

import { ActivityStore } from '@stores/ActivityStore'

export default function ServerAlert({ children }: TWrapperProps) {
  const { serverBox, setServerBox } = useContext(ActivityStore)
  const message = 'Please correct following errors'

  let isError = false
  let type:any = ''
  let description = serverBox.message

  switch (serverBox.status) {
    case 422:
      isError = true
      type = 'warning'

      description = (
        <ul>
          {Object.keys(serverBox.errors).map(
            (key: string) => serverBox.errors[key] && <li>{serverBox.errors[key]}</li>
          )}
        </ul>
      )
   
      break
    case 404:
    case 401:
    case 400:
    case 500:
      isError = true 
      type = 'error'
      break
  }

  useEffect(() => {
    if (serverBox.status === 200) {
      notification.success({ 
        message: 'Success', 
        description: serverBox.message,
      })
      setServerBox({ status: -1, message: '', errors: {} })
    }
  }, [serverBox.status])
    
  return (
    <React.Fragment>
      {isError && 
        <Alert
          message={message}
          description={description}
          type={type} // success, info, warning, error
          onClose={() => setServerBox({ status: -1, message: '', errors: {} })}
          style={{marginBottom: '16px'}}
          closable
        />
      }
    </React.Fragment>
  )
}