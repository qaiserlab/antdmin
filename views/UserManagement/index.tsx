import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Space, Table, Button, Modal, notification } from 'antd';
import { FileTextOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { api } from '@helpers/Api';
import StickArea from '@components/StickArea';
import { ActivityStore } from '@stores/ActivityStore';
import { UserRecordInterface } from './schema';

export default function UserManagement() {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const { setServerResult } = useContext(ActivityStore);

  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: UserRecordInterface) => {
        return (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => router.push(`/user/edit/${record.id}`)} />
            <Button 
              icon={<DeleteOutlined />} 
              onClick={
                () => modal.confirm({
                  title: 'Confirm',
                  content: <p>Delete {record.fullName} data?</p>, 
                  onOk: () => handleDelete(record.id),
                })
              } 
            />
          </Space>
        );
      },
    }
  ];

  const refreshData = async () => {
    setIsLoading(true);

    const response = await api.get('/user');
    const result = await response.json();

    if (response.ok) {
      setRecords(result.data);
    }
    else {
      setRecords([]);
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

  return (
    <React.Fragment>
      {contextHolder}

      <Head>
        <title>User Management</title>
      </Head> 
      <section>
        <Table 
          loading={isLoading} 
          columns={columns} 
          dataSource={records} 
          rowKey={(record) => record.id}
        />

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