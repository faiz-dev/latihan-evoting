
import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'
import { fetchGroupMember } from './_groupRequest'

const initGroupMemberPropState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: [],
  message: "",
  fetchMember: () => {}
}

const GroupMemberContext = createContext(initGroupMemberPropState)

const useGroupMember = () => {
  return useContext(GroupMemberContext)
}

const GroupMemberProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [data, setData] = useState([])

  const fetchMember = async (groupsId) => {
    if(!groupsId || isLoading) return
    setIsLoading(true)
    try {
      const memberApiResponse = await fetchGroupMember(groupsId)
      const {data} = memberApiResponse
      setData(data.users)
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
    <GroupMemberContext.Provider value={{isLoading, isError, isSuccess, message, data, fetchMember}}>
      {children}
    </GroupMemberContext.Provider>
  )
}

GroupMemberProvider.propTypes = {
  children: PropTypes.node
}

export {useGroupMember, GroupMemberProvider}