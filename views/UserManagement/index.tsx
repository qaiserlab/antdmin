import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Space, Table, Pagination, Button, Modal, notification } from 'antd';
import { FileTextOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { api } from '@helpers/Api';
import StickArea from '@components/StickArea';
import { ActivityStore } from '@stores/ActivityStore';
import { UserRecordInterface } from './schema';

const { confirm } = Modal;

export default function UserManagement() {
  const router = useRouter();
  const pageSize = 5;

  const { setServerResult } = useContext(ActivityStore);

  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);

  const columns = [
    { title: 'Name', dataIndex: 'firstName' },
    { title: 'Username', dataIndex: 'userName' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone Number', dataIndex: 'phoneNumber' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: string, record: UserRecordInterface) => {
        return (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => router.push(`/user/edit/${record.id}`)} />
            <Button 
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
        );
      },
    }
  ];

  const refreshData = async (page?: number) => {
    setIsLoading(true);

    const response = await api.get('/user', {
      page: (page)?page:1,
      pageSize,
    });
    const result = await response.json();

    if (response.ok) {
      setRecords(result.data);
      setTotal(result.total);
    }
    else {
      setRecords([]);
      setTotal(0);

      notification.error({
        message: 'Error',
        description: result.message,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    (refreshData)();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await api.del(`/user/force-delete/${id}`);
    const result = await response.json();
    
    if (response.ok) {
      refreshData();
    }

    setServerResult(result);
  };

  const handleNew = () => {
    router.push('/user/new');
  };

  const handlePageChange = (page: number) => {
    refreshData(page);
  };

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
              onChange={handlePageChange}
              pageSize={pageSize} 
              total={total} 
            />
          }
        </Space>

        <StickArea>
          <Space>
            <Button 
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
  );
}