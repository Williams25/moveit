import Head from "next/head"
import { MenuBarContext } from "../../src/contexts/MenuBarContext"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import Users from "../../src/services/user"
import styles from "../../src/styles/Cadastrar.module.css"

const Cadastrar = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  const { menuDisabled, isMenuBarActive } = useContext(MenuBarContext)

  const router = useRouter()

  const cadastrar = async () => {
    await Users.cadastrar({ userName, password }).then(res => {
      if (res.status === 201) {
        setUserName("")
        setPassword("")
        setErro("Cadastrado com sucesso")
      }
    }).catch(e => {
      const { message } = e.response.data
      setErro(message)
    })
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

        <span>Cadastrar-se</span>

        <div className={styles.github}>
          <p>
            <img src="github.svg" alt="" />
            Cadastre-se com seu Github
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
            className={styles.cadastrar}
            style={{ background: "#4cd62b" }}
            onClick={cadastrar}>
            Cadastrar-se
          </button>

          <button
            className={styles.login}
            style={{ background: "#2aa9e0" }}
            onClick={() => router.push('/')}>
            Voltar para Login
          </button>
          <span className={styles.erro}>
            {erro}
          </span>
        </form>

      </motion.div>

    </div>
  )
}

export default Cadastrar