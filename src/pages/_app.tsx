import { store } from "@/redux/store";
import "@/styles/globals.css";
import { appWithTranslation, useTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  console.log('RERENDER----')
  // const router = useRouter()
  // const { i18n } = useTranslation()
  // useEffect(() => {
  //   const lang = localStorage.getItem('locale')
  //   if (lang && i18n.changeLanguage) {
  //     i18n.changeLanguage(lang)
  //     router.push(router.asPath, router.asPath, { locale: lang })
  //   }
  // }, [i18n])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(App);