import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Spin, Space, Modal, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons'
// import { CloseCircleOutlined } from '@ant-design/icons'

import { api } from '@helpers/Api'
import { AuthStore } from '@stores/AuthStore'

// const { confirm } = Modal

export default function UserInfo() {
  const router = useRouter()
  const { state, dispatch } = useContext(AuthStore)
  const [isLoading, setIsLoading] = useState(false)

  const refreshData = async () => {
    if (!state.authInfo.isLogin && localStorage.accessToken) {
      setIsLoading(true)
  
      const response = await api.get('/profile')
      const result = await response.json()
      
      if (response.ok) {
        dispatch({
          type: 'refresh',
          payload: {
            userInfo: result.data,
          }
        })
      }
      else {
        notification.error({ 
          message: 'Error', 
          description: result.message,
        })

        // confirm({
        //   title: result.message,
        //   icon: <CloseCircleOutlined />,
        //   content: 'Logout from Application?',
        //   okText: 'Logout',
        //   cancelText: 'Try Again',
        //   onOk() {
        //     console.log('OK')
        //   },
        //   onCancel() {
        //     console.log('Cancel')
        //   },
        // })
      }

      setIsLoading(false)
    }
    else if (!localStorage.accessToken) {
      // setIsLoading(true)

      // const response = await api.post('/logout', {
      //   UserId: state.userInfo.id
      // })
      // const result = await response.json()

      // if (response.ok) {
        dispatch({ type: 'logout' })
        router.push('/login')
      // }
      // else {
      //   notification.error({ 
      //     message: 'Error', 
      //     description: result.message,
      //   })
      // }

      // setIsLoading(false)
    }
  }

  useEffect(() => {
    (refreshData)()
  }, [])

  return (
    <Spin spinning={isLoading}>
      {state.userInfo.firstName && (
        <Space>
        <UserOutlined />
          <span>
            {state.userInfo.firstName}&nbsp
            {state.userInfo.lastName}
          </span>
        </Space>
      )}
    </Spin>
  )
}