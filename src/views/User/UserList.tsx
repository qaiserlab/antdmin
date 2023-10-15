import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Space, Table, Pagination, Modal, notification } from "antd"
import {
  FileTextOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  QuestionOutlined,
} from "@ant-design/icons"

import useFilterable from "@hooks/useFilterable"
import useUser from "@hooks/useUser"
import StickArea from "@components/StickArea/StickArea"
import Button from "@components/Button/Button"
import UserForm from "./UserForm"

const { confirm } = Modal

export default function UserList() {
  const router = useRouter()
  const {
    users,
    fetchPaginateUsers,
    deleteUserById,
    pageActive,
    pageSize,
    count,
    fetching,
  } = useUser()

  const [toggle, setToggle] = useState<{
    display: boolean
    isNew?: boolean
    id?: string
  }>()

  const handleRefresh = async (page?: number, params?: object) => {
    fetchPaginateUsers(page, params).catch((description: string) => {
      notification.error({ message: "Error", description })
    })
  }

  const handleNew = () => setToggle({ display: true, isNew: true })
  const handleDetail = (id: string) => router.push(`/user/detail/${id}`)
  const handleEdit = (id: string) => setToggle({ display: true, id })
  
  const handleDelete = async (id: string) => {
    confirm({
      title: "Confirm",
      icon: <QuestionOutlined />,
      content: "Delete this data?",
      onOk: () => {
        deleteUserById(id)
          .then((description: string) => {
            notification.success({
              message: "Success",
              description,
            })
            handleRefresh(pageActive)
          })
          .catch((description: string) =>
            notification.error({ message: "Error", description })
          )
      },
    })
  }

  const handleFilter = (dataIndex: string, keyword: string) => {
    handleRefresh(1, { [dataIndex]: keyword })
  }

  const columns: any = [
    useFilterable({
      title: "Name",
      dataIndex: "firstName",
      onFilter: handleFilter,
    }),
    useFilterable({
      title: "Username",
      dataIndex: "username",
      onFilter: handleFilter,
    }),
    useFilterable({
      title: "Email",
      dataIndex: "email",
      onFilter: handleFilter,
    }),
    useFilterable({
      title: "Phone Number",
      dataIndex: "phoneNumber",
      onFilter: handleFilter,
    }),
    {
      title: "Action",
      dataIndex: "action",
      render: (text: string, record: TUserRecord) => {
        return (
          <Space>
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleDetail(record.id)}
            />
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.id)}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Space>
        )
      },
    },
  ]

  useEffect(() => {
    handleRefresh()
  }, [])

  return (
    <>
      <Head>
        <title>User List</title>
      </Head>
      <section>
        <Space direction={"vertical"} style={{ width: "100%" }}>
          <Table
            loading={fetching}
            columns={columns}
            dataSource={users}
            rowKey={(user) => user.id}
            pagination={false}
          />

          {count > pageSize && (
            <Pagination
              onChange={(page: number) => handleRefresh(page)}
              pageSize={pageSize}
              total={count}
              current={pageActive}
            />
          )}
        </Space>

        <StickArea>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              shape={"circle"}
              size={"large"}
              onClick={() => handleRefresh()}
            />

            <Button
              icon={<FileTextOutlined />}
              type={"primary"}
              shape={"circle"}
              size={"large"}
              onClick={handleNew}
            />
          </Space>
        </StickArea>
      </section>

      <UserForm toggle={toggle} onClose={() => setToggle({ display: false })} />
    </>
  )
}
