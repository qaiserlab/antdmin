import { ReactNode } from 'react';
import Head from 'next/head';

interface MainLayoutProps {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <section>
      <Head>
        <title>React Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </section>
  )
}