import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'
import { fetchLoginToken, generateTokenApi } from './_groupRequest'

const initLoginTokenPropState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isLoadingGenerate: false,
  isErrorGenerate: false,
  data: [],
  message: "",
  fetchTokens: () => { },
  generateToken: () => { }
}

const LoginTokenContext = createContext(initLoginTokenPropState)

const useLoginToken = () => {
  return useContext(LoginTokenContext)
}

const LoginTokenProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false)
  const [isErrorGenerate, setIsErrorGenerate] = useState(false)

  const [message, setMessage] = useState("")
  const [data, setData] = useState([])

  const fetchTokens = async (groupsId) => {
    if (!groupsId) return

    setIsLoading(true)
    try {
      const tokenApiResponse = await fetchLoginToken(groupsId)
      const { data } = tokenApiResponse
      const tokensLib = []
      for(let t of data.loginTokens) {
        tokensLib[t.usersId] = {
          token: t.token,
          createdAt: t.createdAt
        }
      }
      setData(tokensLib)
      setIsSuccess(true)
      setIsLoading(false)
      setIsError(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
      if (error.response && error.response.data) {
        setMessage(error.response.data.message)
      } else setMessage(error.message)
    }
  }

  const generateToken = async (usersId, groupsId) => {
    if (!usersId || isLoadingGenerate) return
    setIsLoadingGenerate(true)
    try {
      await generateTokenApi(usersId)
      await fetchTokens(groupsId)
      setIsLoadingGenerate(false)
      setIsErrorGenerate(false)
    } catch (error) {
      setIsErrorGenerate(true)
      setIsLoadingGenerate(false)
      if (error.response && error.response.data) {
        setMessage(error.response.data.message)
      } else setMessage(error.message)
    }
  }

  return (
    <LoginTokenContext.Provider value={{isLoading, isError, isSuccess, message, data, fetchTokens, generateToken, isLoadingGenerate, isErrorGenerate}}>
      {children}
    </LoginTokenContext.Provider>
  )
}

LoginTokenProvider.propTypes = {
  children: PropTypes.node
}

export {useLoginToken, LoginTokenProvider}