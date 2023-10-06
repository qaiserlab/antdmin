import React, { useState, useEffect, useContext } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Space, Table, Pagination, Modal } from "antd"
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons"

import { ActivityStore } from "@stores/ActivityStore"
import useFilterable from "@hooks/useFilterable"
import useUser from "@hooks/useUser"
import StickArea from "@components/StickArea/StickArea"
import Button from "@components/Button/Button"

const { confirm } = Modal

export default function UserList() {
  const { setServerBox } = useContext(ActivityStore)
  const router = useRouter()
  const {
    users,
    fetchPaginateUsers,
    deleteUserById,
    pageActive,
    pageSize,
    count,
    loading,
  } = useUser()

  const handleRefresh = async (page?: number, params?: object) => {
    fetchPaginateUsers(page, params).catch((message: string) => {
      alert(message)
    })
  }

  const handleFilter = (dataIndex: string, keyword: string) => {
    handleRefresh(1, { [dataIndex]: keyword })
  }

  const handleNew = () => router.push("/user/new")
  const handleEdit = (id: string) => router.push(`/user/edit/${id}`)

  const handleDelete = async (id: string) => {
    deleteUserById(id)
      .then(() => handleRefresh(pageActive))
      .catch((message) => alert(message))
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
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.id)}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() =>
                confirm({
                  title: "Confirm",
                  content: <p>Delete {record.username} data?</p>,
                  onOk: () => handleDelete(record.id),
                })
              }
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
    <React.Fragment>
      <Head>
        <title>User Management</title>
      </Head>
      <section>
        <Space direction={"vertical"} style={{ width: "100%" }}>
          <Table
            loading={loading}
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
    </React.Fragment>
  )
}
