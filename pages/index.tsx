import Head from "next/head"
import { CompliteChallenges } from "../src/components/CompliteChallenges"
import { Countdown } from "../src/components/Countdown"
import { ExperienceBar } from "../src/components/ExperienceBar"
import { Profile } from "../src/components/Profile"

import styles from "../src/styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Moveit</title>
      </Head>
      
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompliteChallenges />
          <Countdown />
        </div>

        <div>
        </div>
      </section>
    </div>
  )
}
