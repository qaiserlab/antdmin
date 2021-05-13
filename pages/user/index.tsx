import React from 'react';

import AppLayout from '@layouts/AppLayout';
import UserManagement from '@views/UserManagement';

export default function UserRoute() {
  return (
    <AppLayout>
      <UserManagement />
    </AppLayout>
  );
}