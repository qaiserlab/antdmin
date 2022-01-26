import Head from 'next/head'

export default function RootLayout({ children }: any) {
  return (
    <section id={'root'}>
      <Head>
        <title>React Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </section>
  )
}