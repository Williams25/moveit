import { useState, useContext } from "react"
import styles from "./ChallengeBox.module.css"
import { Context } from "../../contexts/ChallengeContext"

export const ChallengeBox = () => {
  const { activeChallenge, resetChallenge } = useContext(Context)

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
              <footer>
                <button
                  type="button"
                  className={styles.challengeFailButton}
                  onClick={resetChallenge}
                >
                  Falhei
                </button>
                <button
                  type="button"
                  className={styles.challengeSuucceededButton}
                >
                  Completei
                </button>
              </footer>
            </main>
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