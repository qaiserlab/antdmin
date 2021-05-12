import React from 'react';

import Head from 'next/head'
import Link from 'next/link';

import AppLayout from '@layouts/AppLayout';

export default function Login() {
  return (
    <AppLayout>
      <Head>
        <title>Home</title>
      </Head> 

      <Link href={'/login'}>
        <a>GO TO LOGIN PAGE {process.env.HOST} TEST</a>
      </Link>
    </AppLayout>
  );
}