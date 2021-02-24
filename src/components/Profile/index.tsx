import styles from "./Profile.module.css"

export const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/43673479?s=400&v=4" alt=""/>

      <div>
        <strong>William</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}