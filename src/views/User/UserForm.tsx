import React, { useEffect } from "react"
import { Modal, Row, Col, Spin, Typography, Space, notification } from "antd"
import { useFormik } from "formik"
import * as Yup from "yup"

import useUser from "@hooks/useUser"
import Input from "@components/Input/Input"
import Button from "@components/Button/Button"
import { WarningOutlined } from "@ant-design/icons"

const { Text } = Typography
const { warning } = Modal

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  retypePassword: "",
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, "First Name can't more than 50 characters")
    .required("First Name required"),
  lastName: Yup.string(),
  username: Yup.string()
    .max(50, "Username can't more than 50 characters")
    .required("Username required"),
  email: Yup.string()
    .max(50, "Email can't more than 50 characters")
    .required("Email required")
    .email("Invalid Email format"),
  password: Yup.string()
    .max(50, "New Password can't more than 50 characters")
    .required("New Password required"),
  retypePassword: Yup.string()
    .max(50, "Confirm New Password can't more than 50 characters")
    .required("Confirm New Password required"),
  phoneNumber: Yup.string(),
})

interface TProps {
  toggle: {
    display: boolean
    isNew?: boolean
    id?: string
  }
  onClose: () => void
}

export default function UserForm({ toggle, onClose }: TProps) {
  const title = toggle?.isNew ? "New" : "Edit"

  const { user, fetchUserById, createUser, updateUser, fetching, loading } =
    useUser()

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: (values: Partial<TUserRecord>) => {
      if (toggle?.isNew) {
        createUser(values)
          .then((description: string) => {
            notification.success({ message: "Success", description })
            onClose()
          })
          .catch((content: string) => {
            warning({
              title: "Invalid",
              icon: <WarningOutlined />,
              content,
            })
          })
      } else {
        updateUser(toggle?.id, values)
          .then((description: string) => {
            notification.success({ message: "Success", description })
            onClose()
          })
          .catch((content: string) => {
            warning({
              title: "Invalid",
              icon: <WarningOutlined />,
              content,
            })
          })
      }
    },
  })

  useEffect(() => {
    if (toggle?.display && !toggle?.isNew) {
      if (user) {
        formik.setFieldValue("firstName", user?.firstName)
        formik.setFieldValue("lastName", user?.lastName)
        formik.setFieldValue("username", user?.username)
        formik.setFieldValue("email", user?.email)
        // formik.setFieldValue('password', user?.password)
        // formik.setFieldValue('retypePassword', user?.retypePassword)
        formik.setFieldValue("phoneNumber", user?.phoneNumber)
      } else {
        fetchUserById(toggle?.id)
      }
    }
  }, [toggle, user])

  return (
    <Modal
      title={title}
      visible={toggle?.display}
      onCancel={() => {
        if (onClose) onClose()
      }}
      width="90%"
      footer={null}
    >
      <form onSubmit={formik.handleSubmit}>
        <Spin spinning={fetching}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={3}>
              First Name
            </Col>
            <Col xs={24} lg={21}>
              <Input
                name={"firstName"}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.errors.firstName ? "error" : null}
                disabled={loading}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <Text type={"danger"}>{formik.errors.firstName}</Text>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Last Name
            </Col>
            <Col xs={24} lg={21}>
              <Input
                name={"lastName"}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.errors.lastName ? "error" : null}
                disabled={loading}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <Text type={"danger"}>{formik.errors.lastName}</Text>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Username
            </Col>
            <Col xs={24} lg={21}>
              <Input
                name={"username"}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.errors.username ? "error" : null}
                disabled={loading}
              />
              {formik.errors.username && formik.touched.username && (
                <Text type={"danger"}>{formik.errors.username}</Text>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Email
            </Col>
            <Col xs={24} lg={21}>
              <Input
                name={"email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.errors.email ? "error" : null}
                disabled={loading}
              />
              {formik.errors.email && formik.touched.email && (
                <Text type={"danger"}>{formik.errors.email}</Text>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Phone Number
            </Col>
            <Col xs={24} lg={21}>
              <Input
                name={"phoneNumber"}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.errors.phoneNumber ? "error" : null}
                disabled={loading}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <Text type={"danger"}>{formik.errors.phoneNumber}</Text>
              )}
            </Col>

            <Col xs={24} lg={3}>
              New Password
            </Col>
            <Col xs={24} lg={21}>
              <Input
                name={"password"}
                type={"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.errors.password ? "error" : null}
                disabled={loading}
              />
              {formik.errors.password && formik.touched.password && (
                <Text type={"danger"}>{formik.errors.password}</Text>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Retype Password
            </Col>
            <Col xs={24} lg={21}>
              <Input
                name={"retypePassword"}
                type={"password"}
                value={formik.values.retypePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.errors.retypePassword ? "error" : null}
                disabled={loading}
              />
              {formik.errors.retypePassword &&
                formik.touched.retypePassword && (
                  <Text type={"danger"}>{formik.errors.retypePassword}</Text>
                )}
            </Col>
            <Col span={24}>
              <Space style={{ marginTop: 16, float: "right" }}>
                <Button
                  loading={loading}
                  disabled={loading}
                  htmlType="submit"
                  size="large"
                  type="primary"
                >
                  Save
                </Button>
                <Button onClick={onClose} disabled={loading} size="large">
                  Cancel
                </Button>
              </Space>
            </Col>
          </Row>
        </Spin>
      </form>
    </Modal>
  )
}
