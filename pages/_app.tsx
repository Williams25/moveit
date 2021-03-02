import "../src/styles/global.css"
import Head from "next/head"
import { MenuBar } from "../src/components/MenuBar"
import { MenuBarProvider } from "../src/contexts/MenuBarContext"

function MyApp({ Component, pageProps }) {
  return (
    <MenuBarProvider>
      <MenuBar>
        <Head>
          <title>Moveit</title>
        </Head>
        <Component {...pageProps} />
      </MenuBar>
    </MenuBarProvider>
  )
}

export default MyApp