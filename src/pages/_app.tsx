import 'antd/dist/antd.css'
import '@styles/global.scss'

import { prototypeHelper } from '@helpers/PrototypeHelper'
import { ActivityProvider } from '@stores/ActivityStore'

prototypeHelper.applyAll()

export default function App({ Component, pageProps }) {
  return (
    <ActivityProvider>
      <Component {...pageProps} />
    </ActivityProvider>
  )
}