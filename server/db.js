const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chatRoom')
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))
const usrSchema = mongoose.Schema({
  account: String,
  password: String,
  name: String,
  headPic: String
})

const chatListSchema = mongoose.Schema({
  img: String,
  msg: String,
  src: String,
  time: String,
  type: String,
  sendAccount: String,
  targetAccount: String,
  headPic: String,

})
const chatMsgSchema = mongoose.Schema({
  img: String,
  msg: String,
  src: String,
  time: String,
  type: String,
  sendAccount: String,
  sendName: String,
  headPic: String,
  room: String,

})
const Models = {
  Login: mongoose.model('Login', usrSchema),
  charList: mongoose.model('chatListDitale', chatListSchema),
  chatMsg: mongoose.model('chatGroupList', chatMsgSchema),
}

module.exports = Models
