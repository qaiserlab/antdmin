import 'antd/dist/antd.css'
import '@styles/global.scss'

import { ActivityProvider } from '@stores/ActivityStore'
import { AuthProvider } from '@stores/AuthStore'

export default function App({ Component, pageProps }) {
  return (
    <ActivityProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ActivityProvider>
  )
}