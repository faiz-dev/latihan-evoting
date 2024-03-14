import axios from 'axios'
import { API_URL } from '../../../consts/strings'

export const fetchAllGroup = () => {
  return axios.get(`${API_URL}/groups`)
    .then(response => response.data)
}

export const fetchGroupMember = (groupsId) => {
  return axios.get(`${API_URL}/groups/${groupsId}/member`)
    .then(response => response.data)
}

export const fetchGroupVotes = (groupsId, electionsId) => {
  return axios.get(`${API_URL}/elections/${electionsId}/votes-bygroup/${groupsId}`)
    .then(response => response.data)
}

export const fetchLoginToken = (groupsId) => {
  return axios.get(`${API_URL}/login-token/get-by-group/${groupsId}`)
    .then(response => response.data)
}

export const generateTokenApi = (usersId) => {
  return axios.post(`${API_URL}/login-token`, {usersId})
    .then(response => response.data)
}