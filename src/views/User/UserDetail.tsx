import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Row, Col, Space, Button, Card, Spin, notification } from "antd"
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons"

import useUser from "@hooks/useUser"
import StickArea from "@components/StickArea/StickArea"
import UserForm from "./UserForm"

interface TProps {
  id: string
}

export default function UserDetail({ id }: TProps) {
  const router = useRouter()
  const { user, fetchUserById, fetching } = useUser()

  const [toggle, setToggle] = useState<{
    display: boolean
    isNew?: boolean
    id?: string
  }>()

  const handleEdit = () => setToggle({ display: true, id })

  useEffect(() => {
    if (id) {
      fetchUserById(id).catch((description: string) =>
        notification.error({ message: "Error", description })
      )
    }
  }, [id])

  return (
    <>
      <Head>
        <title>User Detail</title>
      </Head>

      <Spin spinning={fetching}>
        <Card title="User Detail">
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={3}>
              First Name
            </Col>
            <Col xs={24} lg={21}>
              {user?.firstName || "-"}
            </Col>
            <Col xs={24} lg={3}>
              Last Name
            </Col>
            <Col xs={24} lg={21}>
              {user?.lastName || "-"}
            </Col>
            <Col xs={24} lg={3}>
              Username
            </Col>
            <Col xs={24} lg={21}>
              {user?.username || "-"}
            </Col>
            <Col xs={24} lg={3}>
              Email
            </Col>
            <Col xs={24} lg={21}>
              {user?.email || "-"}
            </Col>
            <Col xs={24} lg={3}>
              Phone Number
            </Col>
            <Col xs={24} lg={21}>
              {user?.phoneNumber || "-"}
            </Col>
            <Col xs={24} lg={3}>
              Role
            </Col>
            <Col xs={24} lg={21}>
              {user?.role?.roleName || "-"}
            </Col>
          </Row>
        </Card>
      </Spin>

      <StickArea>
        <Space>
          <Button
            onClick={() => router.push("/user")}
            icon={<ArrowLeftOutlined />}
            shape={"circle"}
            size={"large"}
          />

          <Button
            onClick={handleEdit}
            icon={<EditOutlined />}
            type={"primary"}
            htmlType={"submit"}
            shape={"circle"}
            size={"large"}
          />
        </Space>
      </StickArea>

      <UserForm toggle={toggle} onClose={() => setToggle({ display: false })} />
    </>
  )
}
