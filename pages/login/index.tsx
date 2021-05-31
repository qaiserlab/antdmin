import React from 'react';
import Link from 'next/link';

import RootLayout from '@layouts/RootLayout';
import StickArea from '@components/StickArea';
import LoginForm from '@views/LoginForm';

export default function LoginPage() {
  return (
    <RootLayout>
      <StickArea align={'center'} valign={'center'}>
        <section style={{width: '300px'}}>
          <LoginForm />
        </section>
      </StickArea>
    </RootLayout>
  );
}