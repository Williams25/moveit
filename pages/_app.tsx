import "../src/styles/global.css"
import Head from "next/head"
import { ChallengesContext } from "../src/contexts/ChallengeContext"

function MyApp({ Component, pageProps }) {
  return (

    <ChallengesContext>
      <Head>
        <title>Moveit</title>
      </Head>
      <Component {...pageProps} />
    </ChallengesContext>

  )
}

export default MyApp