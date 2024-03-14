
import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'
import { fetchMemberCount } from './_requests'

const initGroupMemberCountPropState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: [],
  message: "",
  fetchMember: () => {}
}

const GroupMemberCountContext = createContext(initGroupMemberCountPropState)

const useGroupMemberCount = () => {
  return useContext(GroupMemberCountContext)
}

const GroupMemberCountProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [data, setData] = useState([])

  const fetchMember = async () => {
    if(isLoading) return
    setIsLoading(true)
    try {
      const memberApiResponse = await fetchMemberCount()
      const {data} = memberApiResponse
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
    <GroupMemberCountContext.Provider value={{isLoading, isError, isSuccess, message, data, fetchMember}}>
      {children}
    </GroupMemberCountContext.Provider>
  )
}

GroupMemberCountProvider.propTypes = {
  children: PropTypes.node
}

export {useGroupMemberCount, GroupMemberCountProvider}