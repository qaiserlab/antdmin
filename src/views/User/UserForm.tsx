import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import * as Yup from "yup"
import { Modal, Row, Col, Input, Spin, Typography, Space } from "antd"
import { useFormik } from "formik"
import { AxiosError } from "axios"

import { apiV1 } from "@helpers/ApiHelper"
import { ActivityStore } from "@stores/ActivityStore"
import useUser from "@hooks/useUser"
import Button from "@components/Button/Button"

const { Text } = Typography

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phoneNumber: "",
  newPassword: "",
  confirmNewPassword: "",
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
  newPassword: Yup.string()
    .max(50, "New Password can't more than 50 characters")
    .required("New Password required"),
  confirmNewPassword: Yup.string()
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
  const router = useRouter()

  const title = toggle?.isNew ? "New" : "Edit"
  const { setServerBox, resetServerBox } = useContext(ActivityStore)

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values: Partial<TUserRecord>, { setSubmitting }) => {
      try {
        const data = {
          ...values,
          RoleId: "4bae9535-df47-46fe-b395-7be379d01f31",
        }

        if (toggle?.isNew) {
          await apiV1.post("/users", data)
        } else {
          await apiV1.put(`/users/${toggle?.id}`, data)
        }

        resetServerBox()
        router.push("/user")
      } catch (error: AxiosError | any) {
        if (error.response) {
          const result = error.response.data
          setServerBox(result)
        }
      } finally {
        setSubmitting(false)
      }
    },
  })

  const { user, fetchUserById, fetching, loading } = useUser()

  useEffect(() => {
    if (toggle?.display && !toggle?.isNew) {
      if (user) {
        formik.setFieldValue("firstName", user?.firstName)
        formik.setFieldValue("lastName", user?.lastName)
        formik.setFieldValue("username", user?.username)
        formik.setFieldValue("email", user?.email)
        // formik.setFieldValue('newPassword', user?.newPassword)
        // formik.setFieldValue('confirmNewPassword', user?.confirmNewPassword)
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
                disabled={formik.isSubmitting}
                status={formik.errors.firstName ? "error" : null}
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
                disabled={formik.isSubmitting}
                status={formik.errors.lastName ? "error" : null}
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
                disabled={formik.isSubmitting}
                status={formik.errors.username ? "error" : null}
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
                disabled={formik.isSubmitting}
                status={formik.errors.email ? "error" : null}
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
                disabled={formik.isSubmitting}
                status={formik.errors.phoneNumber ? "error" : null}
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
                name={"newPassword"}
                type={"password"}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                status={formik.errors.newPassword ? "error" : null}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <Text type={"danger"}>{formik.errors.newPassword}</Text>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Retype Password
            </Col>
            <Col xs={24} lg={21}>
              <Input
                name={"confirmNewPassword"}
                type={"password"}
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                status={formik.errors.confirmNewPassword ? "error" : null}
              />
              {formik.errors.confirmNewPassword &&
                formik.touched.confirmNewPassword && (
                  <Text type={"danger"}>
                    {formik.errors.confirmNewPassword}
                  </Text>
                )}
            </Col>
            <Col span={24}>
              <Space style={{ marginTop: 16, float: "right" }}>
                <Button htmlType="submit" size="large" type="primary">
                  Save
                </Button>
                <Button onClick={onClose} size="large">
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
