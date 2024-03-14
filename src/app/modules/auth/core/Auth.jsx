import { createContext, useContext, useEffect, useRef, useState } from 'react'
import * as authHelper from './AuthHelpers'
import { getUserByToken } from './_requests'

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
  operator: "",
  operatorLogin: () => {},
  operatorMesssage: ""
}

const AuthContext = createContext(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) =>  {
  const [auth, setAuth] = useState(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState(undefined)
  const [opMessage, setOpMessage] = useState("")
  const [operator, setOperator] = useState("")

  const saveAuth = (auth) => {
    setAuth(auth)
    console.log("saving auth")
    if(auth) {
      console.log("auth true")
      authHelper.setAuth(auth)
    } else {
      console.log("auth false")
      authHelper.removeAuth()
    }
  }

  const operatorLogin = (password, name) => {
    if (password == "123456") {
      setOperator(name)
    } else 
    setOpMessage("Login Operator Gagal")
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout, operator, operatorLogin, opMessage}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, useAuth}