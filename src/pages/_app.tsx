import AppLayout from "@/components/layouts/appLayout"
import AppProvider from "@/components/web3/context/appContext"
import WisdProvider from "@/components/web3/context/wisdContext"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <WisdProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </WisdProvider>
      </AppProvider>
    </>
  )
}
