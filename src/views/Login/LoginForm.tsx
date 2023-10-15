import React, { useEffect, useContext, useRef } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AxiosError } from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Row, Col, Typography, Modal } from "antd"
import { LoginOutlined, WarningOutlined } from "@ant-design/icons"

import { apiV1 } from "@helpers/ApiHelper"
import { ActivityStore } from "@stores/ActivityStore"
import Input from "@components/Input/Input"
import Button from "@components/Button/Button"
import StickArea from "@components/StickArea/StickArea"
import ServerAlert from "@widgets/ServerAlert"

const { Text } = Typography
const { warning } = Modal

const initialValues = {
  username: "",
  password: "",
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(100, "Username can't more than 100 characters")
    .required("Username required"),
  password: Yup.string()
    .max(100, "Password can't more than 100 characters")
    .required("Password required"),
})

export default function LoginForm() {
  const { saveAuth } = useContext(ActivityStore)
  const router = useRouter()
  const usernameRef = useRef(null)

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: (values: Partial<TUserRecord>, { setSubmitting }) => {
      const { username, password } = values

      const formData = {
        username,
        password,
      }

      apiV1
        .post<TAuthRecord>("/auth/login", formData)
        .then((response) => {
          const auth = response.data
          saveAuth(auth)
          router.push("/")
        })
        .catch((error: AxiosError | any) => {
          const response = error?.response
          const content = response?.data?.message

          warning({
            title: "Invalid",
            icon: <WarningOutlined />,
            content,
          })
        })
        .finally(() => setSubmitting(false))
    },
  })

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) {
      usernameRef.current.focus()
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>

      <StickArea align={"center"} valign={"center"}>
        <form onSubmit={formik.handleSubmit} style={{ width: "300px" }}>
          <ServerAlert />

          {/* <h1>Welcome to {config.envy.APP_NAME}</h1>
          <p>Please sign-in to your Account</p> */}

          <Row gutter={[8, 16]}>
            <Col span={24}>
              <label>Username or Email</label>
              <Input
                ref={usernameRef}
                name={"username"}
                placeholder={"Username"}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.errors.username ? "error" : null}
                disabled={formik.isSubmitting}
              />
              {formik.errors.username && formik.touched.username && (
                <Text type={"danger"}>{formik.errors.username}</Text>
              )}
            </Col>

            <Col span={24}>
              <label>Password</label>
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.errors.password ? "error" : null}
                disabled={formik.isSubmitting}
              />
              {formik.errors.password && formik.touched.password && (
                <Text type={"danger"}>{formik.errors.password}</Text>
              )}
            </Col>

            <Col span={24}>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{ width: "100%" }}
                loading={formik.isSubmitting}
              >
                <LoginOutlined />
                Login
              </Button>
            </Col>
          </Row>
        </form>
      </StickArea>
    </React.Fragment>
  )
}
