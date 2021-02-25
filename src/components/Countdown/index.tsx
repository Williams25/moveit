import { useState, useEffect, useContext } from "react"
import { Context } from "../../contexts/ChallengeContext"
import styles from "./Countdown.module.css"

let countdownTimeout: NodeJS.Timeout

export const Countdown = () => {
  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const { startNewChallenge } = useContext(Context)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight,] = String(minutes).padStart(2, "0").split("")
  const [secondsLeft, secondsRight,] = String(seconds).padStart(2, "0").split("")

  const startCountdown = () => {
    setIsActive(true)
    setHasFinished(false)
  }

  const resetCountdown = () => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(0.1 * 60)
  }


  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1 * 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {
        hasFinished ? (
          <button
            disabled
            className={`${styles.countdownButton}`}
          >
            Ciclo encerrado
          </button>
        )
          : (
            <>
              {
                isActive && (
                  <button
                    type="button"
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                  >
                    Abandonar ciclo
                  </button>
                )
              }

              {
                !isActive && (
                  <button
                    type="button"
                    className={styles.countdownButton}
                    onClick={startCountdown}
                  >
                    Iniciar um ciclo
                  </button>
                )
              }
            </>
          )
      }

    </div>
  )
}