import Head from "next/head"
import { GetServerSideProps } from "next"
import { ChallengeBox } from "../src/components/ChallengeBox"
import { CompliteChallenges } from "../src/components/CompliteChallenges"
import { Countdown } from "../src/components/Countdown"
import { ExperienceBar } from "../src/components/ExperienceBar"
import { Profile } from "../src/components/Profile"
import { ChallengesProvider } from "../src/contexts/ChallengeContext"
import { CountdownProvider } from "../src/contexts/CountdownContext"
import { motion } from "framer-motion"
import styles from "../src/styles/Home.module.css"

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home({ challengesCompleted, currentExperience, level }: HomeProps): JSX.Element {
  return (
    <ChallengesProvider
      challengesCompleted={challengesCompleted}
      currentExperience={currentExperience}
      level={level}
    >
      <CountdownProvider>
        <div className={styles.container}>
          <Head>
            <title>Home | Moveit</title>
          </Head>

          <ExperienceBar />

          <section>
            <motion.div
              transition={{ delay: 0, duration: 0.8 }}
              variants={{
                show: { opacity: 1, y: '0' },
                hidden: { opacity: 0, y: '-100%' },
              }}
              initial="hidden"
              animate="show"
            >
              <Profile />
              <CompliteChallenges />
              <Countdown />
            </motion.div>

            <motion.div
              transition={{ delay: 0, duration: 1 }}
              variants={{
                show: { opacity: 1, y: '0' },
                hidden: { opacity: 0, y: '100%' },
              }}
              initial="hidden"
              animate="show"
            >
              <ChallengeBox />
            </motion.div>
          </section>
        </div>
      </CountdownProvider>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}