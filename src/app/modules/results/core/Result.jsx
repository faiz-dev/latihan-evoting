import { createContext, useContext, useState } from 'react'
import { getAvailableVote } from '../../home/core/_request'
import { getElectionResultApi } from './_request'

const initResultPropState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  availableResult: [],
  electionsResult: [],
  message: "",
  getAvailableResult: () => {},
  getElectionResult: () => {}
}

const ResultContext = createContext(initResultPropState)

const useResult = () => {
  return useContext(ResultContext)
}

const ResultProvider = ({children}) => {
  const [availableResult, setAvailableResult] = useState([])
  const [electionsResult, setElectionsResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")

  const getAvailableResult = async () => {
    if(isLoading) return
    
    setIsLoading(true)

    try {
      const {data} = await getAvailableVote()
      setAvailableResult(data.elections)
      setIsSuccess(true)
      setIsLoading(false)
    } catch(error) {
      setIsError(true)
      setIsLoading(false)
      if(error.response && error.response.data) {
        setMessage(error.response.data.message)
      } else setMessage(error.message)
      
    }
  } 

  const getElectionResult = async (electionsId) => {
    if(isLoading) return

    setIsLoading(true)
    try {
      const {data} = await getElectionResultApi(electionsId)
      setElectionsResult(data.result)
      setIsLoading(false)
    } catch(error) {
      console.log(error)
      setIsError(true)
      if(error.response && error.response.data) {
        setMessage(error.response.data.message)
      } else setMessage(error.message)
    }
  }

  return (
    <ResultContext.Provider value={{isLoading, isError, message, availableResult, electionsResult, getAvailableResult, getElectionResult}}>
      {children}
    </ResultContext.Provider>
  )
}


export {useResult, ResultProvider}