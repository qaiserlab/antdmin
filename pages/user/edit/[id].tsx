import React from 'react';
import { useRouter } from 'next/router';

import AppLayout from '@layouts/AppLayout';
import UserManagementForm from '@views/UserManagement/form';

export default function UserEditRoute() {
  const router = useRouter();
  const id = router.query.id.toString();

  return (
    <AppLayout>
      <UserManagementForm id={id} />
    </AppLayout>
  );
}