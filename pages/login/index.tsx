import React from 'react';
import Link from 'next/link';

import RootLayout from '@layouts/RootLayout';
import StickArea from '@components/StickArea';
import LoginForm from '@views/LoginForm';

export default function LoginRoute() {
  return (
    <RootLayout>
      <StickArea align={'center'} valign={'center'}>
        <section style={{width: '300px'}}>
          <LoginForm />
        </section>

        <footer style={{marginTop: '16px', textAlign: 'center'}}>
          <Link href={'/'}>
            <a>BACK TO HOME</a>
          </Link>
        </footer>
      </StickArea>
    </RootLayout>
  );
}