import Head from "next/head"
import { GetServerSideProps } from "next"
import { ChallengeBox } from "../../src/components/ChallengeBox"
import { CompliteChallenges } from "../../src/components/CompliteChallenges"
import { Countdown } from "../../src/components/Countdown"
import { ExperienceBar } from "../../src/components/ExperienceBar"
import { Profile } from "../../src/components/Profile"
import { ChallengesProvider } from "../../src/contexts/ChallengeContext"
import { CountdownProvider } from "../../src/contexts/CountdownContext"
import { MenuBarContext } from "../../src/contexts/MenuBarContext"
import { useContext, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "../../src/styles/Home.module.css"

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
  userName: string
  name: string
  avatar: string
}

export default function Home({ challengesCompleted, currentExperience, level, avatar, name, userName }: HomeProps) {

  const { menuActive, isMenuBarActive } = useContext(MenuBarContext)

  useEffect(() => {
    menuActive()
  }, [isMenuBarActive])

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
              <Profile
                avatar={
                  avatar.length > 1 && avatar ?
                    avatar : localStorage.getItem('avatar')
                }
                name={
                  name.length > 1 && name ?
                    name : localStorage.getItem('name')
                }
                userName={
                  userName.length > 1 && userName ?
                    userName : localStorage.getItem('userName')
                }
              />
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
  const { level, currentExperience, challengesCompleted, avatar, name, userName } = context.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      avatar: String(avatar),
      name: String(name),
      userName: String(userName)
    }
  }
}
