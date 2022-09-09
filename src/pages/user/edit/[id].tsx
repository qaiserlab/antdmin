import React from 'react'
import { useRouter } from 'next/router'

import AppLayout from '@layouts/AppLayout'
import UserForm from '@views/UserManagement/UserForm'

export default function UserEditPage() {
  const router = useRouter()
  const isNew = !router.query.id
  const id = (!isNew)?router.query.id.toString():''

  return (
    <AppLayout>
      <UserForm 
        isNew={isNew} 
        id={id} 
      />
    </AppLayout>
  )
}