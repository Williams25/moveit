import {useContext} from "react"
import { Context } from "../../contexts/ChallengeContext"
import styles from "./LevelUpModal.module.css"

export const LevelUpModal = () => {

  const { level, closeLevelUpModal } = useContext(Context)

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level 🎉🎉🎉</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  )
}

export default LevelUpModal;