import { useState, useEffect, useContext } from "react"
import { CountdownContext } from "../../contexts/CountdownContext"
import styles from "./Countdown.module.css"

export const Countdown = () => {

  const { hasFinished, isActive, minutes, seconds, resetCountdown, startCountdown, Timer } = useContext(CountdownContext)

  const [minuteLeft, minuteRight,] = String(minutes).padStart(2, "0").split("")
  const [secondsLeft, secondsRight,] = String(seconds).padStart(2, "0").split("")

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
                  <>
                    <button
                      type="button"
                      className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                      onClick={resetCountdown}
                    >
                      Abandonar ciclo
                  </button>
                    <div className={styles.countdownButtonTimeTransition}>
                      <div style={{ animationDuration: `${Timer}s` }} />
                    </div>
                  </>
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