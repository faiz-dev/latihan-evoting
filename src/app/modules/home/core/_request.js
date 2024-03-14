import axios from 'axios';
import { API_URL } from '../../../consts/strings';

export function getAvailableVote() {
  return axios.get(`${API_URL}/elections`)
    .then(response => response.data)
}

export function getMyVotes(token) {
  return axios.get(`${API_URL}/app/votes-history`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `bearer ${token}`
    }
  })
    .then(response => response.data)
}