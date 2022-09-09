import 'antd/dist/antd.css'
import '@styles/global.scss'

import applyPrototypes from '@helpers/applyPrototypes'
import { ActivityProvider } from '@stores/ActivityStore'
import { AuthProvider } from '@stores/AuthStore'

applyPrototypes()

export default function App({ Component, pageProps }) {
  return (
    <ActivityProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ActivityProvider>
  )
}