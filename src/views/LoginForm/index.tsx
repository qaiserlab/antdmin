import React, { useEffect, useContext, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { Row, Col, Space, Input, Button, Typography } from 'antd'
import { LoginOutlined, UndoOutlined } from "@ant-design/icons"
import { AxiosError } from 'axios'

import axios from '@helpers/axiosInstance'
import { initialValues, validationSchema } from './schema'
import StickArea from '@components/StickArea'
import { ActivityStore } from '@stores/ActivityStore'
import { AuthStore } from '@stores/AuthStore'
import ServerAlert from '@widgets/ServerAlert'

const { Text } = Typography

export default function LoginForm() {
  const router = useRouter()
  
  const { setServerSaid, clearServerSaid } = useContext(ActivityStore)
  const { dispatch } = useContext(AuthStore)
  
  const userNameRef = useRef(null)

  const formik = useFormik({
    initialValues,
    validationSchema,
    
    onSubmit: async (values, { setSubmitting }) => {

      try {
        const data = {
          email: values.userName,
          password: values.password,
        }
        const response = await axios.post(
          '/auth/sign-in',
          data
        )
        const result = response.data
  
        dispatch({
          type: 'login',
          payload: {
            authInfo: {
              accessToken: result.accessToken,
              // refreshToken: result.refreshToken,
            },
            userInfo: result.userInfo,
          }
        })

        clearServerSaid()
        router.push('/')
      }
      catch (error: AxiosError | any) {
        if (error.response) {
          const result = error.response.data
          setServerSaid(result)
        }
      }
      finally {
        setSubmitting(false)
      }

    },
    
  })

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      userNameRef.current.focus()
    }
  }, [])

  const handleReset = () => {
    formik.resetForm()
    userNameRef.current.focus()
  }

  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>

      <StickArea align={'center'} valign={'center'}>
        <form 
          onSubmit={formik.handleSubmit}
          style={{width: '300px'}}
        >
          <ServerAlert />

          <Row gutter={[8, 16]}>
            <Col span={6}>Username</Col>
            <Col span={18}>
              <Input
                ref={userNameRef}
                name={'userName'}
                placeholder={'Username'}
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.userName && formik.touched.userName && (
                <Text type={'danger'}>{formik.errors.userName}</Text>
              )}
            </Col>
          
            <Col span={6}>Password</Col>
            <Col span={18}>
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.password && formik.touched.password && (
                <Text type={'danger'}>{formik.errors.password}</Text>
              )}
            </Col>

            <Col span={6} />
            <Col span={18}>
              <Space>
                <Button 
                  htmlType={'submit'} 
                  type={'primary'}
                  loading={formik.isSubmitting}
                >
                  <LoginOutlined />
                  Login
                </Button>
                <Button 
                  onClick={handleReset}
                  disabled={formik.isSubmitting}
                >
                  <UndoOutlined />
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </form>
      </StickArea>
    </React.Fragment>
  )
}
