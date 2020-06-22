import 'styles/global.css'
import { AppProps } from 'next/app'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

library.add(fab)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
