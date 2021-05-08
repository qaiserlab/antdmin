import React from 'react';
import Head from 'next/head';

import AppLayout from '@layouts/AppLayout';

export default function UserManagement() {
  return (
    <AppLayout>
      <Head>
        <title>User Management</title>
      </Head> 
      <section>
        USER MANAGEMENT PAGE
      </section>
    </AppLayout>
  );
}