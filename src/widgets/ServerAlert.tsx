import React, { useContext, useEffect } from 'react'

import { Alert, notification } from 'antd'
// import { WarningOutlined } from '@ant-design/icons'

import { ActivityStore } from '@stores/ActivityStore'

export default function ServerAlert({ children }: any) {
  const { serverSaid, setServerSaid } = useContext(ActivityStore)
  const message = 'Please correct following errors'

  let isError = false
  let type:any = ''
  let description:any = serverSaid.message

  switch (serverSaid.status) {
    case 422:
      isError = true
      type = 'warning'

      description = (
        <ul>
          {Object.keys(serverSaid.errors).map(
            (key: any) => serverSaid.errors[key] && <li>{serverSaid.errors[key]}</li>
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
    if (serverSaid.status === 200) {
      notification.success({ 
        message: 'Success', 
        description: serverSaid.message,
      })
      setServerSaid({ status: -1, message: '', errors: {} })
    }
  }, [serverSaid.status])
    
  return (
    <React.Fragment>
      {isError && 
        <Alert
          message={message}
          description={description}
          type={type} // success, info, warning, error
          onClose={() => setServerSaid({ status: -1, message: '', errors: {} })}
          style={{marginBottom: '16px'}}
          closable
        />
      }
    </React.Fragment>
  )
}