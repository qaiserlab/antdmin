import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Space, Table, Pagination, Modal } from 'antd'
import { FileTextOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons"
import { AxiosError } from 'axios'

import apiV1 from '@helpers/apiV1'
import useFilterable from '@hooks/useFilterable'
import StickArea from '@components/StickArea/UiStickArea'
import UiButton from '@components/Button/UiButton'
import { ActivityStore } from '@stores/ActivityStore'

const { confirm } = Modal

export default function UserManagement() {
  const router = useRouter()
  const pageSize = 5

  const { setServerSaid } = useContext(ActivityStore)

  const [isLoading, setIsLoading] = useState(false)
  const [records, setRecords] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    (handleRefresh)()
  }, [])
  
  const handleFilter = (dataIndex: string, keyword: string) => {
    handleRefresh(1, [{
      id: dataIndex, 
      value: keyword,
    }])
  }

  const handleEdit = (id: string) => router.push(`/user/edit/${id}`)

  const handleDelete = async (id: string) => {
    try {
      await apiV1.delete(`/user/force-delete/${id}`)
      handleRefresh()
    }
    catch (error: AxiosError | any) {
      if (error.response) {
        const result = error.response.data
        setServerSaid(result)
      }
    }
  }

  const handleRefresh = async (
    page?: number, 
    filter?: Array<{ id: string, value: string }>
  ) => {
    try {
      setIsLoading(true)
  
      page = (page)?page:1
      filter = (filter)?filter:[]
  
      const filtered = JSON.stringify(filter)
  
      const response = await apiV1.get('/users', {
        data: {
          page,
          pageSize,
          filtered,
        }
      })
      const result = response.data
  
      setRecords(result.data)
      setTotal(result.total)
      setCurrentPage(page)
    }
    catch (error: AxiosError | any) {
      setRecords([])
      setTotal(0)

      if (error.response) {
        const result = error.response.data
        setServerSaid(result)
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleNew = () => router.push('/user/new')

  const columns = [
    useFilterable({ title: 'Name', dataIndex: 'firstName', onFilter: handleFilter }),
    useFilterable({ title: 'Username', dataIndex: 'userName', onFilter: handleFilter }),
    useFilterable({ title: 'Email', dataIndex: 'email', onFilter: handleFilter }),
    useFilterable({ title: 'Phone Number', dataIndex: 'phoneNumber', onFilter: handleFilter }),
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: string, record: TUserRecord) => {
        return (
          <Space>
            <UiButton icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
            <UiButton 
              icon={<DeleteOutlined />} 
              onClick={
                () => confirm({
                  title: 'Confirm',
                  content: <p>Delete {record.userName} data?</p>, 
                  onOk: () => handleDelete(record.id),
                })
              } 
            />
          </Space>
        )
      },
    }
  ]

  return (
    <React.Fragment>
      <Head>
        <title>User Management</title>
      </Head> 
      <section>

        <Space direction={'vertical'} style={{width: '100%'}}>
          <Table 
            loading={isLoading} 
            columns={columns} 
            dataSource={records} 
            rowKey={(record) => record.id}
            pagination={false}
          />

          { (total > pageSize) &&
            <Pagination 
              onChange={(page: number) => handleRefresh(page)}
              pageSize={pageSize} 
              total={total} 
              current={currentPage}
            />
          }
        </Space>

        <StickArea>
          <Space>
            <UiButton 
              icon={<ReloadOutlined />}
              shape={'circle'} 
              size={'large'} 
              onClick={() => handleRefresh()}
            />

            <UiButton 
              icon={<FileTextOutlined />}
              type={'primary'} 
              shape={'circle'} 
              size={'large'} 
              onClick={handleNew}
            />
          </Space>
        </StickArea>
      </section>
    </React.Fragment>
  )
}