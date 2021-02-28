import "../src/styles/global.css"
import Head from "next/head"
import { MenuBar } from "../src/components/MenuBar"

function MyApp({ Component, pageProps }) {
  return (
    <MenuBar>
      <Head>
        <title>Moveit</title>
      </Head>
      <Component {...pageProps} />
    </MenuBar>
  )
}

export default MyApp