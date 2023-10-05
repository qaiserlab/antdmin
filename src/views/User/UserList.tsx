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
import { AxiosError } from "axios"

import { apiV1 } from "@helpers/ApiHelper"
import useFilterable from "@hooks/useFilterable"
import useUser from "@hooks/useUser"
import StickArea from "@components/StickArea/StickArea"
import Button from "@components/Button/Button"
import { ActivityStore } from "@stores/ActivityStore"

const { confirm } = Modal

export default function UserList() {
  const { setServerBox } = useContext(ActivityStore)
  const router = useRouter()
  const { users, fetchPaginateUsers, pageActive, pageSize, pageNum, loading } =
    useUser()

  useEffect(() => {
    handleRefresh()
  }, [])

  const handleFilter = (dataIndex: string, keyword: string) => {
    handleRefresh(1, [
      {
        id: dataIndex,
        value: keyword,
      },
    ])
  }

  const handleEdit = (id: string) => router.push(`/user/edit/${id}`)

  const handleDelete = async (id: string) => {
    try {
      await apiV1.delete(`/user/force-delete/${id}`)
      handleRefresh()
    } catch (error: AxiosError | any) {
      if (error.response) {
        const result = error.response.data
        setServerBox(result)
      }
    }
  }

  const handleRefresh = async (
    page?: number,
    filter?: Array<{ id: string; value: string }>
  ) => {
    fetchPaginateUsers()

    try {
      page = page ? page : 1
      filter = filter ? filter : []

      const filtered = JSON.stringify(filter)

      const response = await apiV1.get("/users", {
        data: {
          page,
          pageSize,
          filtered,
        },
      })
      const result = response.data

      // setRecords(result.users)
      // setTotal(result.count)
    } catch (error: AxiosError | any) {
      // setRecords([])
      // setTotal(0)

      if (error.response) {
        const result = error.response.data
        setServerBox(result)
      }
    }
  }

  const handleNew = () => router.push("/user/new")

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

          {pageNum > pageSize && (
            <Pagination
              onChange={(page: number) => handleRefresh(page)}
              pageSize={pageSize}
              total={pageNum}
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
