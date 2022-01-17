<template>
  <mt-popup
    v-model="popupVisible"
    position="right"
  >
    <div class='chatDetail-container' @keyup.enter="Enter_send($event)">
      <mt-header style="background-color:#26a00f; " :title="userInfo.name">
        <div slot="left" @click="goChatList">
          <mt-button icon="back">返回</mt-button>
        </div>
        <mt-button v-if='userInfo.type!="group"' slot="right" @click='removeChat'>清除</mt-button>
      </mt-header>
      <div class='chat-box' ref='chat-box' id='chat-box' :style="{backgroundImage: 'url(' + chatBgUrl+ ')'}">

        <template v-for='(item,index) in chatDetailList'>
          <div v-if='item.sendAccount==account' class='ourLists' :key='index'>
            <div class='time'>{{ item.time }}
              <span v-if='userInfo.type=="group"'>{{ item.sendName || item.sendAccount }}</span>
            </div>
            <div class='ourList'>
              <div class='info'>
                {{ item.msg }}
              </div>
              <img class='headPic' :src='item.headPic'/>
            </div>
          </div>
          <div v-else class='chat-lists' :key='index'>
            <div class='time'>
              <span v-if='userInfo.type=="group"'>{{ item.sendName || item.sendAccount }}</span>
              {{ item.time }}

            </div>
            <div class='chat-list'>
              <img class='headPic' :src='item.headPic'/>
              <div class='info'>
                {{ item.msg }}
              </div>
            </div>

          </div>
        </template>
      </div>
      <div class='input-boxs'>
        <div class='icons-box'>
          <i class='iconfont icon-icon_im_face'></i>
          <div class='emoji-container' v-show="isShowEmoji">
            <div class='emoji-box'>
              <div class='emoji-item'>
                <span class='emoji-item-info' v-for='(item,index) in emoji.hot' :key='index'
                      @click='selectEmoji(item)'>
                    {{ item }}
                </span>
              </div>
              <div class='emoji-item'>
                <span class='emoji-item-info' v-for='(item,index) in emoji.people' :key='index'
                      @click='selectEmoji(item)'>
                    {{ item }}
                </span>
              </div>
              <div class='emoji-item'>
                <span class='emoji-item-info' v-for='(item,index) in emoji.nature' :key='index'
                      @click='selectEmoji(item)'>
                    {{ item }}
                </span>
              </div>
              <div class='emoji-item'>
                <span class='emoji-item-info' v-for='(item,index) in emoji.items' :key='index'
                      @click='selectEmoji(item)'>
                    {{ item }}
                </span>
              </div>
              <div class='emoji-item'>
                <span class='emoji-item-info' v-for='(item,index) in emoji.place' :key='index'
                      @click='selectEmoji(item)'>
                    {{ item }}
                </span>
              </div>
              <div class='emoji-item'>
                <span class='emoji-item-info' v-for='(item,index) in emoji.single' :key='index'
                      @click='selectEmoji(item)'>
                    {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class='input-box'>
          <mt-field v-model="massage" class='massage-input'></mt-field>
          <mt-button type='primary' @click='sendMassage' size='small'>发送</mt-button>
        </div>
      </div>
    </div>
  </mt-popup>
</template>
<script>
import bgPic from '../../assets/img/bgPic.jpg'
import io from 'socket.io-client'
import * as chatListApi from '@/webApi/chatList'
import * as meApi from '@/webApi/Me'
import emoji from '@/utils/emoji'

const socket = io.connect('http://localhost:8088')
export default {
  name: 'ChatDetail',
  props: {
    userInfo: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      popupVisible: true,
      headPic: '',
      name: '',
      account: this.$store.state.account,
      massage: '',
      chatBgUrl: bgPic,
      emoji: emoji,
      chatDetailList: []
    }
  },
  computed: {
    isShowEmoji () {
      return this.$store.getters.isShowEmoji
    }
  },
  created () {
    this.getUserInfo()
    if (this.userInfo.room) {
      this.getGroupList()
    } else {
      this.getChatDetailList()
    }

  },
  mounted () {
    socket.on('receiveMessage', (msg) => {
      this.chatDetailList.push(msg)
    })
    socket.on('receiveGroupMessage', (msg) => {
      this.chatDetailList.push(msg)
    })
  },
  updated () {
    this.scrollToButtom()
  },
  methods: {
    scrollToButtom () {
      this.$nextTick(function () {
        this.$refs['chat-box'].scrollTop = this.$refs['chat-box'].scrollHeight
      })
    },
    getUserInfo () {
      meApi.getUserInfo({account: this.account})
        .then(res => {
          if (res.data.state == 0) {
            this.$toast({
              message: res.data.errStr,

            })
          } else {
            this.name = res.data.name
            this.headPic = res.data.headPic
          }
        })
    },
    getGroupList () {
      chatListApi.getGroupList(
        {room: this.userInfo.room}
      )
        .then(res => {
          this.chatDetailList = res
        })
    },
    getChatDetailList () {
      chatListApi.getChatDetailList(
        {sendAccount: this.account, targetAccount: this.userInfo.account}
      )
        .then(res => {
          this.chatDetailList = res
        })
    },
    removeChat () {
      chatListApi.deleteChatDetailList(
        {sendAccount: this.account, targetAccount: this.userInfo.account}
      )
        .then(res => {
          this.chatDetailList = []
        })
    },
    Enter_send (E) {
      this.sendMassage()
    },
    sendMassage () {
      if (this.massage === '') {
      } else {
        if (this.userInfo.room) {
          const data = {
            img: '',
            msg: this.massage,
            src: '',
            type: '',
            sendAccount: this.account,
            sendName: this.name,
            headPic: this.headPic,
            room: this.userInfo.room,
            time: this.getTime()
          }
          socket.emit('sendGroupMessage', data)
        } else {
          const data = {
            img: '',
            msg: this.massage,
            src: '',
            type: '',
            sendAccount: this.account,
            targetAccount: this.userInfo.account,
            headPic: this.headPic,
            time: this.getTime()
          }
          socket.emit('sendMessage', data)
        }
      }

      this.massage = ''
    },
    selectEmoji (emoji) {
      this.massage = this.massage + emoji
    },

    goChatList () {
      if (this.userInfo.type == 'group') {
        this.$emit('close')
      } else {
        this.$router.push({name: 'ChatList'})
      }

    },
    getTime () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      var time = year + '-' + month + '-' + day + ' ' + ' ' + hour + ':' + minute + ':' + second
      return time
    }

  }
}
</script>
<style lang="scss" scoped>
.mint-popup {
  width: 100%;
  height: 100%;
}

.chatDetail-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .chat-box {
    flex: 1;
    background: #f5f5f5;
    background-size: 100%;
    background-repeat: 'no-repeat';
    overflow-y: auto;

    .chat-lists {
      .time {
        color: #fff;
        text-align: left;
        padding: 0.05rem 0.1rem;
      }

      .chat-list {
        padding: 0.1rem 0.1rem;
        display: flex;

        .headPic {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 0.05rem;
          margin-right: 0.15rem;
        }

        .info {
          padding: 0.05rem;
          max-width: 2rem;
          height: 2ch;
          background: #fff;
          border: 1px solid #fff;
          color: #000;
          position: relative;
          border-radius: 0.05rem;

          &:after {
            position: absolute;
            top: 15px;
            content: "";
            width: 0;
            height: 0;
            left: -15px;
            border-top: 15px solid #fff;
            border-left: 15px solid transparent;
          }

        }
      }
    }

    .ourLists {
      .time {
        color: #fff;
        text-align: right;
        padding: 0.05rem 0.1rem;
      }

      .ourList {
        padding: 0.05rem 0.1rem;
        display: flex;
        justify-content: flex-end;

        .headPic {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 0.05rem;
          margin-left: 0.2rem;

        }

        .info {
          padding: 0.05rem;
          max-width: 2rem;
          height: 2ch;
          background: rgb(11, 201, 112);
          border: 1px solid #e5e5e5;
          color: #fff;
          position: relative;
          border-radius: 0.05rem;

          &:after {
            position: absolute;
            top: 15px;
            content: "";
            width: 0;
            height: 0;
            right: -15px;
            border-top: 15px solid rgb(11, 201, 112);;
            border-right: 15px solid transparent;
          }
        }
      }
    }
  }

  .input-boxs {
    .icons-box {
      padding-top: 0.1rem;
      position: relative;
      border-top: 1px solid #bebebe;

      i {
        margin-left: 0.1rem;
        margin-right: 0.1rem;
      }

      .emoji-container {
        position: absolute;
        width: 100%;
        overflow-x: auto;
        height: 2rem;

        bottom: 0.28rem;
        background: #fff;

        .emoji-box {
          .emoji-item {
            display: flex;

            .emoji-item-info {
              display: block;
              margin: 0.05rem;
              font-size: 0.16rem;
            }
          }
        }
      }
    }

    .input-box {
      display: flex;
      align-items: center;

      .massage-input {
        flex: 1;

        input {
          padding-left: 0.05rem;
        }
      ;
        margin-bottom: 20px;
      }

    }

  }
}
</style>
<style>
.input-box .mint-field .mint-cell-value {
  border: 1px solid #bbb9b9;
  height: 0.25rem;
  border-radius: 10px;
  padding: 0.05rem;
}

</style>
