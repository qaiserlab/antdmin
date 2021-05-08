import React from 'react';
import Link from 'next/link';

import StickArea from '@components/StickArea';
import LoginForm from '@views/LoginForm';

export default function Login() {
  return (
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
  );
}