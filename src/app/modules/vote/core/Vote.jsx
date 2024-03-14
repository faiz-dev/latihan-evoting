import { createContext, useContext, useState } from 'react'
import { postSendVote } from './_request'
import PropTypes from 'prop-types'


const initVotePropState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: null,
  message: "",
  sendVote: () => {}
}

const VoteActionContext = createContext(initVotePropState)

const useVoteAction = () => {
  return useContext(VoteActionContext)
}

const VoteActionProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")

  const sendVote = async (token, electionsId, candidatesId) => {
    if(isLoading) return
    
    setIsLoading(true)
    try {
      await postSendVote(token, electionsId, candidatesId)
      setIsSuccess(true)
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 2000)
      console.log(error.response)
      if(error.response && error.response.data) {
        setMessage(error.response.data.message)
      } else setMessage(error.message)
      
      return false
    }
  }

  return (
    <VoteActionContext.Provider value={{isLoading, isError, isSuccess, message, sendVote}}>
      {children}
    </VoteActionContext.Provider>
  )
}

VoteActionProvider.propTypes = {
  children: PropTypes.node
}

export {useVoteAction, VoteActionProvider}