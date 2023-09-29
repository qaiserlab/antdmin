import React from 'react'

import AppLayout from '@layouts/AppLayout'
import UserList from '@views/User/UserList'

export default function UserPage() {
  return (
    <AppLayout>
      <UserList />
    </AppLayout>
  )
}