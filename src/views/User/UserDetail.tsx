import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Row, Col, Space, Button, Card, Spin, notification } from "antd"
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons"

import StickArea from "@components/StickArea/StickArea"
import useUser from "@hooks/useUser"
import UserForm from "./UserForm"

interface TProps {
  id: string
}

export default function UserDetail({ id }: TProps) {
  const router = useRouter()
  const { user, fetchUserById, fetching } = useUser()

  const title = "User Detail"

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
        <title>{title}</title>
      </Head>

      <Spin spinning={fetching}>
        <Card title={title}>
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
            icon={<ArrowLeftOutlined />}
            shape={"circle"}
            size={"large"}
            onClick={() => router.push("/user")}
          />

          <Button
            icon={<EditOutlined />}
            type={"primary"}
            htmlType={"submit"}
            shape={"circle"}
            size={"large"}
            onClick={handleEdit}
          />
        </Space>
      </StickArea>

      <UserForm toggle={toggle} onClose={() => setToggle({ display: false })} />
    </>
  )
}
