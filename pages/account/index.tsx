import React from 'react';
import Head from 'next/head';

import AppLayout from '@layouts/AppLayout';

export default function AccountRoute() {
  return (
    <AppLayout>
      <Head>
        <title>Profile</title>
      </Head> 
      <section>
        PROFILE PAGE
      </section>
    </AppLayout>
  );
}