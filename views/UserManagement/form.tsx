import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Row, Col, Space, Input, Button, Card } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useFormik } from 'formik';

import StickArea from '@components/StickArea';
import { PropsInterface, initialValues } from './schema';

export default function UserManagementForm(props: PropsInterface) {
  const isNew = props.isNew;
  const id = props.id;
  const title = (isNew)?'New':'Edit';

  const router = useRouter();

  const formik = useFormik({
    initialValues,
    onSubmit: (values: any, { setSubmitting }) => {
      alert(JSON.stringify(values));
      setSubmitting(false);
    }
  });

  return (
    <React.Fragment>
      <Head>
        <title>User Management</title>
      </Head>

      <form onSubmit={formik.handleSubmit}>
        <Card title={title}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={3}>
              First Name
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'firstName'}
                value={formik.values.firstName} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Col>

            <Col xs={24} lg={3}>
              Last Name
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'lastName'}
                value={formik.values.lastName} 
                
onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Col>

            <Col xs={24} lg={3}>
              Username
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'userName'}
                value={formik.values.userName} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Col>

            <Col xs={24} lg={3}>
              Email
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'email'}
                value={formik.values.email} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Col>

            <Col xs={24} lg={3}>
              Phone Number
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'phoneNumber'}
                value={formik.values.phoneNumber} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Col>
          </Row>
        </Card>        

        <StickArea>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />}
              shape={'circle'} 
              size={'large'}
              onClick={() => router.push('/user')}
            />

            <Button 
              icon={<SaveOutlined />}
              type={'primary'} 
              htmlType={'submit'}
              shape={'circle'} 
              size={'large'}
            />
          </Space>
        </StickArea>
      </form>
    </React.Fragment>
  )
}