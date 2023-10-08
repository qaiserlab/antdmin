import React from 'react'
import { useRouter } from 'next/router'

import AppLayout from '@layouts/AppLayout'
import UserDetail from '@views/User/UserDetail'

export default function UserDetailPage() {
  const router = useRouter()
  const id = router.query?.id?.toString()

  return (
    <AppLayout>
      <UserDetail id={id} />
    </AppLayout>
  )
}