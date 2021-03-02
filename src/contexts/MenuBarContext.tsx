import { createContext, useState, ReactNode, useEffect } from "react"

interface MenuBarContextData {
  isMenuBarActive: boolean
  menuActive: () => void
  menuDisabled: () => void
}

interface MenuBarProps {
  children: ReactNode
}

export const MenuBarContext = createContext({} as MenuBarContextData)

export const MenuBarProvider = ({ children }: MenuBarProps) => {
  const [isMenuBarActive, setIsMenuBarActive] = useState(false)

  const menuActive = () => {
    setIsMenuBarActive(true)
  }
  const menuDisabled = () => {
    setIsMenuBarActive(false)
  }

  return (
    <MenuBarContext.Provider
      value={{
        isMenuBarActive,
        menuActive,
        menuDisabled,
      }}
    >
      {children}
    </MenuBarContext.Provider>
  )
}