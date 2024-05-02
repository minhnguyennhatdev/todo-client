import { store } from "@/redux/store";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Exo_2 } from 'next/font/google'

const exo2 = Exo_2({ subsets: ['latin'] })


function App({ Component, pageProps }: AppProps) {
  console.log('RERENDER----')
  return (
    <main className={exo2.className}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  )
}

export default appWithTranslation(App);