import React from 'react'

import AppLayout from '@layouts/AppLayout'
import UserView from '@views/UserManagement/UserView'

export default function UserPage() {
  return (
    <AppLayout>
      <UserView />
    </AppLayout>
  )
}