import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'
import { getCandidates, getElectionDetail } from './_request'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../auth/core/Auth'

const initCandidatesPropsState = {
  candidates: [],
  isLoading: true,
  fetchData: () => {},
  isError: false,
  message: "",
  election: {},
  isElectionLoading: false,
  fetchEletions: () => {}
}

const CandidatesContext = createContext(initCandidatesPropsState)

const useCandidates = () => {
  return useContext(CandidatesContext)
}

const CandidatesProvider = ({children}) => {
  const [candidates, setCandidates] = useState([])
  const [election, setElections] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isElectionLoading, setElectionLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const {id: electionsId} = useParams()
  const { auth } = useAuth()

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const candidateApiResponse = await getCandidates(electionsId)
      const {data} = candidateApiResponse
      setCandidates(data.candidates)
      setInterval(() => {
        setIsLoading(false)
      }, 500)
    } catch(error) {
      setIsError(true)
    }
    console.log(auth)
  }

  const fetchElection = async () => {
    setElectionLoading(true)
    try {
      const apiResponse = await getElectionDetail(electionsId)
      const {data} = apiResponse
      setElections(data.election)
      setElectionLoading(false)
    } catch (error) {
      setIsError(true)
    }
  }

  return (
    <CandidatesContext.Provider value={{candidates, isLoading, fetchData, isError, isElectionLoading, fetchElection, election}}>
      {children}
    </CandidatesContext.Provider>
  )
}

CandidatesProvider.propTypes = {
  children: PropTypes.node
}

export {useCandidates, CandidatesProvider}