import { createContext, useContext, useState } from 'react'
import { fetchAllGroup } from './_groupRequest'
import PropTypes from 'prop-types'

const initGroupPropState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: [],
  message: "",
  fetchGroup: () => {}
}

const GroupContext = createContext(initGroupPropState)

const useGroup = () => {
  return useContext(GroupContext)
}

const GroupProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [data, setData] = useState([])

  const fetchGroup = async () => {
    setIsLoading(true)
    try {
      const groupsApiResponse = await fetchAllGroup()
      const {data} = groupsApiResponse
      setData(data.groups)
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

  return (
    <GroupContext.Provider value={{isLoading, isError, isSuccess, message, data, fetchGroup}}>
      {children}
    </GroupContext.Provider>
  )
}

GroupProvider.propTypes = {
  children: PropTypes.node
}

export {useGroup, GroupProvider}