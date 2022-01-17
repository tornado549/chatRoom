import axios from 'axios'

export function getAccount () {
  return axios.get('/api/login/getAccount')
    .then(res => {
      return res
    })
}

export function createAccount (params) {
  return axios.post('/api/login/createAccount', params)
    .then(res => {
      return res
    })
}

export function login (params) {
  return axios.post('/api/login/login', params)
    .then(res => {
      return res
    })
}
