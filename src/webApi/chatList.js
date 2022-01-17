import axios from 'axios'

export function getChatList () {
  return axios.get('/api/Chat/getChatList', {params: {...option}})
    .then(res => {
      return res.data
    })
}

export function getGroupList (option) {
  return axios.get('/api/chat/getGroupList', {params: {...option}})
    .then(res => {
      return res.data
    })
}

export function getChatDetailList (option) {
  return axios.get('/api/chat/getChatDetailList', {params: {...option}})
    .then(res => {
      return res.data
    })
}

export function saveChatGroupDetailList (option) {
  return axios.get('/api/chat/saveChatGroupDetailList', {...option})
    .then(res => {
      return res.data
    })
}

export function saveChatDetailList (option) {
  return axios.get('/api/chat/saveChatDetailList', {...option})
    .then(res => {
      return res.data
    })
}

export function deleteChatDetailList (option) {
  return axios.get('/api/chat/deleteChatDetailList', {params: {...option}})
    .then(res => {
      return res.data
    })
}
