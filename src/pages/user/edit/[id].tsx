import React from 'react'
import { useRouter } from 'next/router'

import AppLayout from '@layouts/AppLayout'
import UserManagementForm from '@views/UserManagement/form'

export default function UserEditPage() {
  const router = useRouter()
  const isNew = !router.query.id
  const id = (!isNew)?router.query.id.toString():''

  return (
    <AppLayout>
      <UserManagementForm 
        isNew={isNew} 
        id={id} 
      />
    </AppLayout>
  )
}