import { createContext, useState, ReactNode, useEffect } from "react"
import challenges from "../../challenges.json"

interface Challenge {
  type: string
  description: string
  amount: number
}

interface ChallengeContextData {
  level: number,
  levelUp: () => void
  currentExperience: number
  challengesCompleted: number
  startNewChallenge: () => void
  activeChallenge: Challenge
  resetChallenge: () => void
  experienceToNextLevel: number,
  compliteChallenge: () => void
}

interface ChallengesContextProps {
  children: ReactNode
}

export const Context = createContext({} as ChallengeContextData)

export const ChallengesProvider = ({ children }: ChallengesContextProps) => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 5, 2)

  const levelUp = () => setLevel(level + 1)

  const startNewChallenge = () => {
    const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[ramdomChallengeIndex]
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉🎉🎉', {
        body: `Valendo ${challenge.amount} xp!!!`
      })
    }
  }

  const resetChallenge = () => {
    setActiveChallenge(null)
  }

  const compliteChallenge = () => {
    if (!activeChallenge) return

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  return (
    <Context.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        compliteChallenge
      }}
    >
      {children}
    </Context.Provider>
  )
}