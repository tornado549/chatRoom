<template>
  <div class='mailList-contianer'>
    <mt-header style="background-color:#26a00f; " title="聊天室">
      <mt-button slot="left" @click="loginout">退出</mt-button>
    </mt-header>
    <div class='list-box'>
      <li class='user-item' @click='chat()'>
        <img class='headPic' :src="headPic"/>
        <span class='name'>群聊</span>
      </li>
    </div>
    <ChatDetail v-if='chatDetailWin.visible' v-bind='chatDetailWin' @close='closeChatDetail'/>
  </div>
</template>
<script>

import ChatDetail from './CharRoom'
import roomPic from '../../assets/img/roomPic.jpg'

export default {
  components: {
    ChatDetail
  },
  name: 'ChatList',
  data () {
    return {
      headPic: roomPic,
      chatDetailWin: {
        visible: false,
        userInfo: {
          type: 'group',
          room: 'room1',
        }
      }
    }
  },
  methods: {
    chat () {
      this.chatDetailWin.visible = true
    },
    closeChatDetail () {
      this.chatDetailWin.visible = false
    },
    loginout () {
      this.$router.push('/Login')
    }
  }
}
</script>

<style lang="scss" scoped>
.mailList-contianer {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .list-box {
    flex: 1;

    .user-item {
      list-style: none;
      display: flex;
      padding: 10px;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;

      .headPic {
        height: 50px;
        width: 50px;
        margin-right: 20px;
      }

      .name {
        flex: 1;
      }
    }
  }
}
</style>
