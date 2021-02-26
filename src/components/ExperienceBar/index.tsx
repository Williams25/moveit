import { useContext } from "react"
import { Context } from "../../contexts/ChallengeContext"
import { motion } from "framer-motion"
import styles from "./ExperienceBar.module.css"

export const ExperienceBar = () => {

  const { currentExperience, experienceToNextLevel } = useContext(Context)

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -500 },
  }

  return (
    <motion.header
      className={styles.experienceBar}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.5 }}
      variants={variants}
    >
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </motion.header>
  )
}