import React from 'react';

import Head from 'next/head'
import Link from 'next/link';

import AppLayout from '@layouts/AppLayout';

export default function DashboardPage() {
  return (
    <AppLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
    </AppLayout>
  );
}