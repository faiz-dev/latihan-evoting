
import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'
import { fetchVoteCount } from './_requests'

const initGroupVoteCountPropState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: [],
  message: "",
  fetchVote: () => {}
}

const GroupVoteCountContext = createContext(initGroupVoteCountPropState)

const useGroupVoteCount = () => {
  return useContext(GroupVoteCountContext)
}

const GroupVoteCountProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [data, setData] = useState([])

  const fetchVote = async () => {
    if(isLoading) return
    setIsLoading(true)
    try {
      const voteApiResponse = await fetchVoteCount()
      const {data} = voteApiResponse
      setData(data.result)
      setIsSuccess(true)
      setIsLoading(false)
      setIsError(false)
    } catch(error) {
      setIsError(true)
      setIsLoading(false)
      if(error.response && error.response.data) {
        setMessage(error.response.data.message)
      } else setMessage(error.message)
    }
  }

  
  return (
    <GroupVoteCountContext.Provider value={{isLoading, isError, isSuccess, message, data, fetchVote}}>
      {children}
    </GroupVoteCountContext.Provider>
  )
}

GroupVoteCountProvider.propTypes = {
  children: PropTypes.node
}

export {useGroupVoteCount, GroupVoteCountProvider}