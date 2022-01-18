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

  switch (serverSaid.code) {
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
    case 400:
    case 500:
      isError = true 
      type = 'error'
      break
  }

  useEffect(() => {
    if (serverSaid.code === 200) {
      notification.success({ 
        message: 'Success', 
        description: serverSaid.message,
      })
      setServerSaid({ code: -1, message: '', errors: {} })
    }
  }, [serverSaid.code])
    
  return (
    <React.Fragment>
      {isError && 
        <Alert
          message={message}
          description={description}
          type={type} // success, info, warning, error
          onClose={() => setServerSaid({ code: -1, message: '', errors: {} })}
          style={{marginBottom: '16px'}}
          closable
        />
      }
    </React.Fragment>
  )
}