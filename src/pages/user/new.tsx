import React from 'react'

import AppLayout from '@layouts/AppLayout'
import UserForm from '@views/UserManagement/UserForm'

export default function UserNewPage() {
  const isNew = true

  return (
    <AppLayout>
      <UserForm 
        isNew={isNew} 
      />
    </AppLayout>
  )
}