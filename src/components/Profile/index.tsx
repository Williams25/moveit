import { useContext } from "react"
import { Context } from "../../contexts/ChallengeContext"
import styles from "./Profile.module.css"

interface ProfileProps {
  name: string
  userName: string
  avatar: string
}

export const Profile = ({ name, userName, avatar }: ProfileProps) => {

  const { level } = useContext(Context)

  return (
    <div className={styles.profileContainer}>
      <img src={avatar} alt="" />

      <div>
        <strong>
          {
            name.length > 1 && name !== "null" ? name : userName
          }
        </strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}