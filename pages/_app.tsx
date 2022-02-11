import '../styles/main.scss'
import type { AppProps } from 'next/app'
import * as React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
