import Head from "next/head"
import { MenuBarContext } from "../src/contexts/MenuBarContext"
import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import styles from "../src/styles/Login.module.css"

const Home = () => {

  const { menuDisabled, isMenuBarActive } = useContext(MenuBarContext)

  const router = useRouter()

  const handleToLoginSuccess = () => {
    router.push('home')
  }

  const handleToSubmit = e => {
    e.preventDefault()
  }

  useEffect(() => {
    menuDisabled()
  }, [isMenuBarActive])

  return (
    <div className={styles.containerLogin}>
      <Head>
        <title>Login | Moveit</title>
      </Head>


      <motion.div className={styles.content}
        transition={{ delay: 0, duration: 0.8 }}
        variants={{
          show: { opacity: 1, y: '0' },
          hidden: { opacity: 0, y: '-100%' },
        }}
        initial="hidden"
        animate="show">

        <img src="logo-full.svg" alt="" />

        <span>Bem-vindo</span>

        <div className={styles.github}>
          <p>
            <img src="github.svg" alt="" />
            Faça login com seu Github
            para começar
          </p>
        </div>

        <form method="post"
          onSubmit={handleToSubmit}

        >
          <input type="text"
            placeholder="Digite seu usuario do GitHub"
          />
          <input type="password"
            placeholder="Digite sua senha"
          />
          <button
            className={styles.login}
            onClick={handleToLoginSuccess}>
            Login
          </button>

          <button
            className={styles.cadastrar}
            onClick={() => router.push('cadastrar')}>
            Cadastrar-se
          </button>
        </form>

      </motion.div>

    </div>
  )
}

export default Home