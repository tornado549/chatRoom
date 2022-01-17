'use strict'
const models = require('./db')
const express = require('express')
const router = express.Router()
const fs = require('fs')
let path = require('path')
const {resolve} = require('path')

router.post('/api/login/createAccount', (req, res) => {
  let newAccount = {
    account: req.body.account,
    password: req.body.password,
    name: req.body.account,
    headPic: req.body.headPic
  }
  models.Login.findOne({account: newAccount.account}, function (err, data) {
    if (err) {
      res.send(err)
    } else {
      if (!data) {
        const saveAccount = new models.Login(newAccount)
        saveAccount.save((err, data) => {
          if (err) {
            res.send(err)
          } else {
            res.send({state: 1})
          }
        })

      } else {
        let resdata = {
          state: 0,
          errNum: 1,
          errStr: '用户已经存在'
        }
        res.send(resdata)
      }
    }
  })
})
router.post('/api/login/login', (req, res) => {
  let newAccount = {
    account: req.body.account,
    password: req.body.password
  }
  models.Login.findOne({account: newAccount.account}, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      console.log(data)
      if (!data) {
        let resData = {
          state: 0,
          errNum: 1,
          errStr: '用户不存在'
        }
        res.send(resData)
      } else {
        if (data.password === newAccount.password) {
          res.send({state: 1, account: data.account})
        } else {
          let resData = {
            state: 0,
            errNum: 1,
            errStr: '密码不正确'
          }
          res.send(resData)
        }
      }
    }
  })
})
router.get('/api/MailList/getUserList', (req, res) => {
  models.Login.find((err, data) => {
    if (err) {
      res.send(err)
    } else {
      data.state = 1
      res.send(data)
    }
  })
})
router.get('/api/login/getUserInfo', (req, res) => {
  const account = req.query.account
  models.Login.findOne({account: account}, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      console.log(data)
      if (!data) {
        let resData = {
          state: 0,
          errNum: 1,
          errStr: '用户不存在'
        }
        res.send(resData)
      } else {
        data.state = 1
        res.send(data)
      }
    }
  })
})
router.post('/api/login/editUserInfo', (req, res) => {
  models.Login.update({account: req.body.account}, {...req.body}, (err, data) => {
    console.log({...req.body})
    if (err) {
      res.send(err)
    } else {
      console.log(data)
      if (!data) {
        let resData = {
          state: 0,
          errNum: 1,
          errStr: '修改失败'
        }
        res.send(resData)
      } else {
        data.state = 1
        res.send(data)
      }
    }
  })
})
router.get('/api/MailList/deleteUser', (req, res) => {
  const account = req.query.account
  models.Login.remove({account: account}, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      if (!data) {
        let resData = {
          state: 0,
          errNum: 1,
          errStr: '用户不存在'
        }
        res.send(resData)
      } else {
        data.state = 1
        res.send(data)
      }
    }
  })
})
router.post('/api/login/editPwd', (req, res) => {
  const pwd = {...req.body}
  models.Login.findOne({account: pwd.account}, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      console.log(data)
      if (!data) {
        let resData = {
          state: 0,
          errNum: 1,
          errStr: '用户不存在'
        }
        res.send(resData)
      } else {
        if (pwd.oldPwd != data.password) {
          let resData = {
            state: 0,
            errNum: 1,
            errStr: '密码不正确'
          }
          res.send(resData)
        } else {
          models.Login.update({account: pwd.account}, {password: pwd.newPwd}, (err, data) => {
            if (err) {
              res.send(err)
            } else {
              console.log(data)
              if (!data) {
                let resData = {
                  state: 0,
                  errNum: 1,
                  errStr: '修改失败'
                }
                res.send(resData)
              } else {
                data.state = 1
                res.send(data)
              }
            }
          })
        }
      }
    }
  })
})
router.post('/api/login/editHeadPic', (req, res) => {
  const headPicUrl = req.body.headPicUrl
  var base64Data = headPicUrl.replace(/^data:image\/\w+;base64,/, '')
  var dataBuffer = new Buffer(base64Data, 'base64')
  const dirname = __dirname + '\\img\\headPic.png'
  fs.writeFile(dirname, dataBuffer, function (err) {
    models.Login.update({account: req.body.account}, {headPic: headPicUrl}, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        if (!data) {
          let resData = {
            state: 0,
            errNum: 1,
            errStr: '修改失败'
          }
          res.send(resData)
        } else {
          data.state = 1
          res.send(data)
        }
      }
    })
  })
})
router.get('/api/chat/getChatDetailList', (req, res) => {
  const sendAccount = req.query.sendAccount
  const targetAccount = req.query.targetAccount
  console.log(sendAccount)
  models.charList.find({
    $or: [{'sendAccount': sendAccount, targetAccount: targetAccount}, {
      'sendAccount': targetAccount,
      targetAccount: sendAccount
    }]
  }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      data.state = 1
      res.send(data)
    }
  })
})
router.get('/api/chat/getGroupList', (req, res) => {
  const room = req.query.room
  console.log(room)
  models.chatMsg.find({room}, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      data.state = 1
      res.send(data)
    }
  })
})
router.get('/api/chat/deleteChatDetailList', (req, res) => {
  const sendAccount = req.query.sendAccount
  const targetAccount = req.query.targetAccount
  models.charList.remove({
    $or: [{
      'sendAccount': sendAccount,
      targetAccount: targetAccount
    }, {'sendAccount': targetAccount, targetAccount: sendAccount}]
  }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      if (!data) {
        let resData = {
          state: 0,
          errNum: 1,
          errStr: '用户不存在'
        }
        res.send(resData)
      } else {
        data.state = 1
        res.send(data)
      }
    }
  })
})
module.exports = router
