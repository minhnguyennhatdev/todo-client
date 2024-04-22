import { store } from "@/redux/store";
import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
