import React from 'react';
import Link from 'next/link';

import "antd/dist/antd.css";
import { Button } from 'antd';

export default function Login() {

  const handleClick = (job: string) => {
    alert(job);
  };

  return (
    <React.Fragment>
      <section style={{textAlign: 'center'}}>
        <br />
        
        LOGIN PAGE<br />
        <Link href={'/'}>
          <a>BACK TO HOME</a>
        </Link>
        
        <br />
        <br />
        
        <Button onClick={() => handleClick('Developer')}>TEST</Button>
      </section>
    </React.Fragment>
  );
}