import axios from 'axios'
import { API_URL } from '../../../consts/strings'

export const getCandidates = (electionsId) => {
  return axios.get(`${API_URL}/elections/${electionsId}/candidates`)
    .then(response => response.data)
}

export const getElectionDetail = (electionsId) => {
  return axios.get(`${API_URL}/elections/${electionsId}`)
    .then(response => response.data)
}

export const postSendVote = (token, electionsId, candidatesId) => {

  return axios.post(
      `${API_URL}/app/vote/${electionsId}`, 
      { candidatesId },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`
        }
      }
    ).then(response => response.data)
}