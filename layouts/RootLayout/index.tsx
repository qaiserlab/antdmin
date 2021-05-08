import Head from 'next/head';

export default function MainLayout({ children }) {
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