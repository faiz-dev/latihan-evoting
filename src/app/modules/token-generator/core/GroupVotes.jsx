import { createContext, useContext, useState } from 'react'
import { fetchGroupVotes } from './_groupRequest'

const initGroupVotesPropState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: [],
  message: "",
  fetchVote: () => { }
}

const GroupVotesContext = createContext(initGroupVotesPropState)

const useGroupVotes = () => {
  return useContext(GroupVotesContext)
}

const GroupVotesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [data, setData] = useState([])

  const fetchVote = async (groupsId, electionsId) => {
    if (!groupsId || !electionsId || isLoading) return

    setIsLoading(true)
    try {
      const votesApiResponse = await fetchGroupVotes(groupsId, electionsId)
      const { data } = votesApiResponse
      setData(data.votes.map(v => v.usersId))
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

  return (
    <GroupVotesContext.Provider value={{isLoading, isError, isSuccess, message, data, fetchVote}}>
      {children}
    </GroupVotesContext.Provider>
  )
}

export {useGroupVotes, GroupVotesProvider}