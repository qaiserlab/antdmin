import React from 'react'
import Head from 'next/head'

import AppLayout from '@layouts/AppLayout'

export default function MyAccountPage() {
  return (
    <AppLayout>
      <Head>
        <title>My Account</title>
      </Head> 
      <section>
        MY ACCOUNT PAGE
      </section>
    </AppLayout>
  )
}