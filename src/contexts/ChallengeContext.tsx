import { ReactNode } from "react"
import { createContext, useState } from "react"
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
  experienceToNextLevel: number
}

interface ChallengesContextProps {
  children: ReactNode
}

export const Context = createContext({} as ChallengeContextData)

export const ChallengesContext = ({ children }: ChallengesContextProps) => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(30)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 5, 2)

  const levelUp = () => setLevel(level + 1)

  const startNewChallenge = () => {
    const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[ramdomChallengeIndex]
    setActiveChallenge(challenge)
  }

  const resetChallenge = () => {
    setActiveChallenge(null)
  }

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
        experienceToNextLevel
      }}
    >
      {children}
    </Context.Provider>
  )
}