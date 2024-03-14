import { createContext, useContext, useState } from 'react'
import { getMyVotes } from './_request'
import PropTypes from 'prop-types'

const initMyVotePropsState = {
  myVotes: [],
  isLoading: false,
  isError: false,
  message: "",
  fetchData: () => {}
}

const MyVoteContext = createContext(initMyVotePropsState)

const useMyVote = () => {
  return useContext(MyVoteContext)
}

const MyVoteProvider = ({children}) => {
  const [myVotes, setMyVotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState("")

  const fetchData = async (token) => {
    setIsLoading(true)
    try {
      const myVotesApiResponse = await getMyVotes(token)
      const {data} = myVotesApiResponse

      setMyVotes(data.votes)
      setIsLoading(false)
      return true
    } catch(error) {
      console.log(error) 
      setIsError(true)
      if(error.response && error.response.data) {
        setMessage(error.response.data.message)
      } else setMessage(error.message)
      return false
    }
  }

  return (
    <MyVoteContext.Provider value={{myVotes, isLoading, isError, message, fetchData}}>
      {children}
    </MyVoteContext.Provider>
  )

}

MyVoteProvider.propTypes = {
  children: PropTypes.node
}

export {useMyVote, MyVoteProvider}