import axios from 'axios'
import { API_URL } from '../../../consts/strings'

export function requestLogin(email) {
  return {api_token: "new_token", email: email}
}

export function getUserByToken(token) {
  console.log("getuserbytoken: "+token)
  return {
    id: 1,
    nickname: 'rpl',
    email: 'pplg@smkn1kandeman.sch.id',
    role: 'user'
  }
}

export function requestLoginVoteApi(email) {
  return axios.post(API_URL+'/auth/glogin', {
    email
  })
}

export const requestLoginUsingTokenVoteApi = (token) => {
  return axios.post(`${API_URL}/auth/tps-login`, {token})
    .then(response => response.data)
}