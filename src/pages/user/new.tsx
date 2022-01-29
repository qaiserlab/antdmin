import React from 'react'

import AppLayout from '@layouts/AppLayout'
import UserManagementForm from '@views/UserManagement/form'

export default function UserNewPage() {
  const isNew = true

  return (
    <AppLayout>
      <UserManagementForm 
        isNew={isNew} 
      />
    </AppLayout>
  )
}