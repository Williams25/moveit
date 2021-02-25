import { useContext } from "react"
import { Context } from "../../contexts/ChallengeContext"
import styles from "./CompliteChallenges.module.css"

export const CompliteChallenges = () => {
  const { challengesCompleted } = useContext(Context)
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}
