import React from 'react';
import Head from 'next/head';

import AppLayout from '@layouts/AppLayout';

export default function UserPrivilegesRoute() {
  return (
    <AppLayout>
      <Head>
        <title>User Privileges</title>
      </Head> 
      <section>
        USER PRIVILEGES PAGE
      </section>
    </AppLayout>
  );
}