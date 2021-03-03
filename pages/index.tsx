import Head from "next/head"
import { MenuBarContext } from "../src/contexts/MenuBarContext"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { UserContext, UserProvider } from "../src/contexts/UserContext"
import Users from "../src/services/user"
import styles from "../src/styles/Login.module.css"

const Home = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  const { menuDisabled, isMenuBarActive } = useContext(MenuBarContext)
  const { handleModificationStates, saveCookies } = useContext(UserContext)

  const router = useRouter()

  const handleToSubmit = e => {
    e.preventDefault()
  }

  const login = async () => {
    await Users.login(userName, password).then(res => {
      if (res.status === 202) {
        const { userName, avatar_url, name, id } = res.data
        handleModificationStates({ userName, avatar: avatar_url, name })
        saveCookies({ id, userName, avatar: avatar_url, name })
        router.push('home')
      }
    }).catch(e => {
      const { message } = e.response.data
      setErro(message)
    })
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
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <input type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className={styles.login}
            onClick={login}>
            Login
          </button>

          <button
            className={styles.cadastrar}
            onClick={() => router.push('cadastrar')}>
            Cadastrar-se
          </button>
          <span className={styles.erro}>
            {erro}
          </span>
        </form>
      </motion.div>

    </div>
  )
}

export default Home
