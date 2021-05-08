import React from 'react';

import Head from 'next/head'
import Link from 'next/link';

import RootLayout from '@layouts/RootLayout';
import StickArea from '@components/StickArea';
import LoginForm from '@views/LoginForm';

export default function Login() {
  return (
    <RootLayout>
      <StickArea align={'center'} valign={'center'}>
        <Head>
          <title>Login</title>
        </Head>
        
        <section style={{width: '300px'}}>
          <LoginForm />
        </section>

        <footer style={{marginTop: '16px', textAlign: 'center'}}>
          <Link href={'/'}>
            <a>BACK TO HOME</a>
          </Link>
        </footer>
      </StickArea>
    </RootLayout>
  );
}