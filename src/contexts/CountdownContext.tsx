import { createContext, ReactNode, useState, useContext, useEffect } from "react"
import { Context } from "./ChallengeContext"

interface CountdownContextData {
  minutes: number
  seconds: number
  isActive: boolean
  hasFinished: boolean
  startCountdown: () => void
  resetCountdown: () => void
  Timer: number
}

interface CountdownContextProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export const CountdownProvider = ({ children }: CountdownContextProps) => {
  const Timer = 0.1 * 60
  const [time, setTime] = useState(Timer)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const { startNewChallenge } = useContext(Context)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60


  const startCountdown = () => {
    setIsActive(true)
    setHasFinished(false)
  }

  const resetCountdown = () => {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(Timer)
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
    <CountdownContext.Provider
      value={{
        Timer,
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
