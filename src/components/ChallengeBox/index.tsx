import { useContext } from "react"
import styles from "./ChallengeBox.module.css"
import { Context } from "../../contexts/ChallengeContext"
import { CountdownContext } from "../../contexts/CountdownContext"

export const ChallengeBox = () => {
  const { activeChallenge, resetChallenge, compliteChallenge } = useContext(Context)
  const { resetCountdown } = useContext(CountdownContext)

  const handleChallengeSucceeded = () => {
    compliteChallenge()
    resetCountdown()
  }

  const handleChallengeFailed = () => {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {
        activeChallenge ? (
          <div className={styles.challengeActive}>
            <header>
              Ganhe {activeChallenge.amount} xp
            </header>
            <main>
              <img src={`./icons/${activeChallenge.type}.svg`} alt="" />
              <strong>
                Novo desafio
              </strong>
              <p>
                {activeChallenge.description}
              </p>
            </main>
            <footer>
              <button
                type="button"
                className={styles.challengeFailButton}
                onClick={handleChallengeFailed}
              >
                Falhei
                </button>
              <button
                type="button"
                className={styles.challengeSuucceededButton}
                onClick={handleChallengeSucceeded}
              >
                Completei
                </button>
            </footer>
          </div>
        ) :
          (
            <div className={styles.challengeNotActive}>
              <strong>
                Inicie um ciclo para receber desafios a serem completados
              </strong>
              <p>
                <img src="./icons/level-up.svg" alt="" />
                Avance de level completando desafios
              </p>
            </div>
          )
      }
    </div >
  )
}