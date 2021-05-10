import 'antd/dist/antd.css';
import '@styles/global.scss';

import { AuthProvider } from '@stores/AuthStore';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}