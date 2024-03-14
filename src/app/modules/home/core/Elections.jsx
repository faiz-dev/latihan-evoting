import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../auth/core/Auth'
import { getAvailableVote } from './_request'

const initElectionsPropsState = {
  elections: [],
  isLoading: false,
  fetchData: () => { },
  isError: false,
  message: ""
}

const ElectionsContext = createContext(initElectionsPropsState)

const useElections = () => {
  return useContext(ElectionsContext)
}

const ElectionsProvider = ({ children }) => {
  const [elections, setElections] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const { auth } = useAuth()


  const fetchData = async () => {
    setIsLoading(true)
    try {
      const electionsApiResponse = await getAvailableVote()
      const {data} = electionsApiResponse
      // console.log(electionsDb)
      setElections(data.elections)
      setInterval(() => {
        setIsLoading(false)
      }, 500)
    } catch(error) {
      setIsError(true)
    }
    console.log(auth)
  }

  return (
    <ElectionsContext.Provider value={{ elections, isLoading, fetchData, isError }}>
      {children}
    </ElectionsContext.Provider>
  )
}

ElectionsProvider.propTypes = {
  children: PropTypes.node
}

export {useElections, ElectionsProvider}