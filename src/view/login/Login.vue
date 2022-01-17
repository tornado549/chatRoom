<template>
  <div class='login-container' @keyup.enter="Enter_login($event)">
    <div class='login-box'>
      <h1><span style="color: white; ">登录</span></h1>
      <mt-field placeholder="请输入用户名" v-model="account"></mt-field>
      <mt-field placeholder="请输入密码" type="password" v-model="password" class="login-psw"></mt-field>
      <mt-button type="primary" @click="login" class='login-button'>确定</mt-button>
      <br>
      <router-link to='/Register'>
        <span class='Register' color=white>注册账号</span></router-link>
    </div>
  </div>
</template>
<script>
import Register from './Register'
import {login} from '../../webApi/login'
import {Toast} from 'mint-ui'

export default {
  components: {
    Register
  },
  data () {
    return {
      account: '',
      password: ''
    }
  },
  created () {

  },
  methods: {
    Enter_login (E) {
      this.login()
    },
    login () {
      let params = {account: this.account, password: this.password}
      login(params)
        .then(res => {
          if (res.data.state === 1) {
            this.$store.state.account = res.data.account
            this.$store.state.headPic = res.data.headPic
            this.$router.push({name: 'Home'})
          } else {
            Toast({
              message: res.data.errStr,
            })
          }
        })
    },
  }
}
</script>
<style lang="scss">
.login-container {
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  background: url('../../assets/img/login.jpg');
  padding-top: 1rem;
  font-size: 0.14rem;

  .login-box {
    width: 2rem;
    height: 3rem;
    margin: auto;

    .login-button {
      width: 1rem;
      margin-top: 0.2rem;
      margin-bottom: 0.1rem;
    }

    .login-psw {
      margin-top: 20px;
    }
  }

  .Register {
    text-align: right;
    color: #26a00f;
  }
}

.login-container {
  .mint-field .mint-cell-value {
    border: 1px solid #888787;
    height: 0.35rem;
    border-radius: 0.1rem;

    input {
      background: transparent;
      padding-left: 0.1rem;
    }
  }

  .mint-cell {
    background: transparent;
  }
}
</style>
