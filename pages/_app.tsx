import "../src/styles/global.css"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Moveit</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp