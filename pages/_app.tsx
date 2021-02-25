import "../src/styles/global.css"
import Head from "next/head"
import { ChallengesProvider } from "../src/contexts/ChallengeContext"
import { CountdownProvider } from "../src/contexts/CountdownContext"

function MyApp({ Component, pageProps }) {
  return (

    <ChallengesProvider>
      <CountdownProvider>
        <Head>
          <title>Moveit</title>
        </Head>
        <Component {...pageProps} />
      </CountdownProvider>
    </ChallengesProvider>

  )
}

export default MyApp