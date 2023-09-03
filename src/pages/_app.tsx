import 'antd/dist/antd.css'
import '@styles/global.scss'

import { prototypeHelper } from '@helpers/PrototypeHelper'
import { ActivityProvider } from '@stores/ActivityStore'
import { AuthProvider } from '@stores/AuthStore'

prototypeHelper.applyAll()

export default function App({ Component, pageProps }) {
  return (
    <ActivityProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ActivityProvider>
  )
}