import axios from 'axios'

export function getUserInfo (options) {
  return axios.get('/api/login/getUserInfo', {params: {...options}})
    .then(res => {
      return res
    })
}

export function editUserInfo (params) {
  return axios.post('/api/login/editUserInfo', params)
    .then(res => {
      return res
    })
}

export function editPwd (params) {
  return axios.post('/api/login/editPwd', params)
    .then(res => {
      return res
    })
}

export function editHeadPic (params) {
  return axios.post('/api/login/editHeadPic', params)
    .then(res => {
      return res.data
    })
}
