const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

var http = require('http')
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(api)
app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
server.listen(8088, () => {
  console.log('--> server is running.')
})

const models = require('./db')
io.on('connection', (socket) => {
  socket.on('sendMessage', (msg) => {
    console.log(msg)
    const saveChatDetailList = new models.charList(msg)
    saveChatDetailList.save((err, data) => {
      1
    })
    io.emit('receiveMessage', msg)
  })
  socket.on('sendGroupMessage', (msg) => {
    const saveChatGroupList = new models.chatMsg(msg)
    saveChatGroupList.save((err, data) => {
      if (err) {
        io.emit('receiveGroupMessage', err)
      } else {
        io.emit('receiveGroupMessage', msg)
      }
    })
  })
})
