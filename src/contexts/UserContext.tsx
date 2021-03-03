import { createContext, useState, ReactNode, useEffect } from "react"
import { GetServerSideProps } from "next"
import Cookies from "js-cookie"

interface UserContextData {
  userName: string
  name: string
  avatar: string
  handleModificationStates: (data: dataParams) => void
  saveCookies: (data: dataParams) => void
}

interface UserProps {
  children: ReactNode
  userName?: string
  name?: string
  avatar?: string
}

interface dataParams {
  userName?: string
  name?: string
  avatar?: string
  id?: string
}

export const UserContext = createContext({} as UserContextData)

export const UserProvider = ({ children, ...rest }: UserProps) => {

  const [userName, setUserName] = useState(rest.userName ?? "")
  const [name, setName] = useState(rest.name ?? "")
  const [avatar, setAvatar] = useState(rest.avatar ?? "")

  const handleModificationStates = (data: dataParams) => {
    setUserName(data.userName)
    setAvatar(data.avatar)
    setName(data.name)
  }

  const saveCookies = ({ avatar, name, userName, id }: dataParams) => {
    Cookies.set('userName', String(userName))
    Cookies.set('name', String(name))
    Cookies.set('avatar', String(avatar))

    localStorage.setItem('userName', JSON.stringify(userName))
    localStorage.setItem('name', JSON.stringify(name))
    localStorage.setItem('avatar', JSON.stringify(avatar))
    localStorage.setItem('user', JSON.stringify(id))
  }

  return (
    <UserContext.Provider
      value={{
        userName,
        name,
        avatar,
        handleModificationStates,
        saveCookies
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userName, name, avatar } = context.req.cookies

  return {
    props: {
      userName: String(userName),
      avatar: String(avatar),
      name: String(name)
    }
  }
}