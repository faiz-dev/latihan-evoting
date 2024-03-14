import axios from 'axios'
import { API_URL } from '../../../consts/strings'

export const getElectionResultApi = async (electionsId) => {
  return axios.get(`${API_URL}/elections/${electionsId}/result`)
    .then((response) => response.data)
}