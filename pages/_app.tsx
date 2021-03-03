import "../src/styles/global.css"
import Head from "next/head"
import { MenuBar } from "../src/components/MenuBar"
import { MenuBarProvider } from "../src/contexts/MenuBarContext"
import { UserProvider } from "../src/contexts/UserContext"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <MenuBarProvider>
        <MenuBar>
          <Head>
            <title>Moveit</title>
          </Head>
          <Component {...pageProps} />
        </MenuBar>
      </MenuBarProvider>
    </UserProvider>
  )
}

export default MyApp