import axios from 'axios'
import { API_URL } from '../../../consts/strings'

export const fetchMemberCount = () => {
  return axios.get(API_URL+'/groups/member')
    .then(response => response.data)
}

export const fetchVoteCount = (electionsId) => {
  return axios.get(API_URL+`/elections/${electionsId}/votes-each-groups`)
    .then(response => response.data)
}