import { ReactNode, useState, useContext } from "react"
import { motion } from "framer-motion"
import styles from "./Menu.module.css"
import { MenuBarContext } from "../../contexts/MenuBarContext"


interface MenuProps {
  children: ReactNode
}

export const MenuBar = ({ children }: MenuProps) => {

  const { isMenuBarActive } = useContext(MenuBarContext)

  const [visibleBarHome, setVisibleBarHome] = useState(true)
  const [visibleBarAward, setVisibleBarAward] = useState(false)

  const showBarAward = () => {
    setVisibleBarHome(false)
    setVisibleBarAward(true)
  }

  const showBarHome = () => {
    setVisibleBarAward(false)
    setVisibleBarHome(true)
  }

  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -500 },
  }

  return (
    <>
      {
        isMenuBarActive ? (
          <motion.div
            className={styles.ContainerMenu}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.5 }}
            variants={variants}
          >

            <div className={styles.menu}>
              <div className={styles.logo}>
                <img src="logo.svg" alt="" />
              </div>

              <motion.button className={styles.items}
                onClick={showBarHome}
              >
                {
                  visibleBarHome ?
                    <img src="home.svg" alt=""
                      style={{ cursor: "pointer" }}
                    />
                    :
                    <img src="home-disable.svg" alt=""
                      style={{ cursor: "pointer" }}
                    />
                }

                <div className={styles.itemsActive}
                  style={{ visibility: visibleBarHome ? "visible" : "hidden" }}
                >
                  <img src="hover.svg" alt="" />
                </div>

                <div className={styles.itemsActiveHorizontal}
                  style={{ visibility: visibleBarHome ? "visible" : "hidden" }}
                >
                  <img src="hover-horizontal.svg" alt="" />
                </div>
              </motion.button>

              <button className={styles.items}
                onClick={showBarAward}
              >
                {
                  visibleBarAward ?
                    <img src="award.svg" alt=""
                      style={{ cursor: "pointer" }}
                    />
                    :
                    <img src="award-disable.svg" alt=""
                      style={{ cursor: "pointer" }}
                    />
                }
                <div className={styles.itemsActive}
                  style={{ visibility: visibleBarAward ? "visible" : "hidden" }}
                >
                  <img src="hover.svg" alt="" />
                </div>

                <div className={styles.itemsActiveHorizontal}
                  style={{ visibility: visibleBarAward ? "visible" : "hidden" }}
                >
                  <img src="hover-horizontal.svg" alt="" />
                </div>
              </button>
            </div>
            {children}
          </motion.div>
        ) : (
          <>
            {children}
          </>
        )
      }

    </>
  )
}