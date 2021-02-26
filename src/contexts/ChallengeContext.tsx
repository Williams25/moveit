import { createContext, useState, ReactNode, useEffect } from "react"
import challenges from "../../challenges.json"
import Cookies from "js-cookie"
import LevelUpModal from "../components/LevelUpModal"

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
  closeLevelUpModal: () => void
}

interface ChallengesContextProps {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
}

export const Context = createContext({} as ChallengeContextData)

export const ChallengesProvider = ({ children, ...rest }: ChallengesContextProps) => {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 5, 2)

  const levelUp = () => {
    setLevel(level + 1)
    setIsLevelModalOpen(true)
  }

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

  const closeLevelUpModal = () => setIsLevelModalOpen(false)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

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
        compliteChallenge,
        closeLevelUpModal
      }}
    >
      {children}
     {
       isLevelModalOpen &&  <LevelUpModal />
     }
    </Context.Provider>
  )
}