import React from 'react';
import Link from 'next/link';

import { Button } from 'antd';

import MainLayout from '@layouts/MainLayout'
import StickArea from '@components/StickArea'

export default function Login() {

  const handleClick = (job: string) => {
    alert(job);
  };

  return (
    <MainLayout>
      <StickArea align={'center'} valign={'center'}>
        
        LOGIN PAGE<br />
        <Link href={'/'}>
          <a>BACK TO HOME</a>
        </Link>
        
        <br />
        <br />
        
        <Button onClick={() => handleClick('Developer')}>TEST</Button>
      </StickArea>
    </MainLayout>
  );
}