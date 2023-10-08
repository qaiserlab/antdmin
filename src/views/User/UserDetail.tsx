import React, { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Row, Col, Space, Button, Card, Spin } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import Swal from "sweetalert2"

import StickArea from "@components/StickArea/StickArea"
import useUser from "@hooks/useUser"

interface TProps {
  id: string
}

export default function UserForm({ id }: TProps) {
  const router = useRouter()
  const { userActive, fetchUserActiveById, loading } = useUser()

  const title = "User Detail"

  useEffect(() => {
    if (id) {
      fetchUserActiveById(id).catch((message: string) =>
        Swal.fire("Error", message, "error")
      )
    }
  }, [id])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Spin spinning={loading}>
        <Card title={title}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={3}>
              First Name
            </Col>
            <Col xs={24} lg={21}>
              {userActive?.firstName || '-'}
            </Col>
            <Col xs={24} lg={3}>
              Last Name
            </Col>
            <Col xs={24} lg={21}>
              {userActive?.lastName || '-'}
            </Col>
            <Col xs={24} lg={3}>
              Username
            </Col>
            <Col xs={24} lg={21}>
              {userActive?.username || '-'}
            </Col>
            <Col xs={24} lg={3}>
              Email
            </Col>
            <Col xs={24} lg={21}>
              {userActive?.email || '-'}
            </Col>
            <Col xs={24} lg={3}>
              Phone Number
            </Col>
            <Col xs={24} lg={21}>
              {userActive?.phoneNumber || '-'}
            </Col>
            <Col xs={24} lg={3}>
              Role
            </Col>
            <Col xs={24} lg={21}>
              {userActive?.role?.roleName || '-'}
            </Col>
          </Row>
        </Card>
      </Spin>

      <StickArea>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            shape={"circle"}
            size={"large"}
            onClick={() => router.push("/user")}
          />

          {/* <Button
            icon={<SaveOutlined />}
            type={"primary"}
            htmlType={"submit"}
            shape={"circle"}
            size={"large"}
          /> */}
        </Space>
      </StickArea>
    </>
  )
}
