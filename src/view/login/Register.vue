<template>
  <div class='register-container' @keyup.enter="Enter_register($event)">
    <h1>注册</h1>
    <div class='login-box'>
      <div class='form-box'>
        <mt-field placeholder="请输入用户名" v-model="account"></mt-field>
        <mt-field placeholder="请输入密码" type="password" v-model="password" class="register-psw"></mt-field>
      </div>
      <div class='btn-box'>
        <mt-button type="primary" @click="register" class='login-button'>注册</mt-button>
        <br/>
        <router-link to='/Login'>
          <span class='Register'>去登录</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import * as loginApi from '../../webApi/login'
import {Toast} from 'mint-ui'
import usrPic from '../../assets/img/usrPic.jpeg'

export default {
  name: 'Register',
  data () {
    return {
      account: '',
      password: '',
      headPic: usrPic
    }
  },
  methods: {
    Enter_register (E) {
      this.register()
    },
    register () {
      if (this.checkForm()) {
        const option = {account: this.account, password: this.password, headPic: this.headPic}
        loginApi.createAccount(option)
          .then(res => {
            if (res.data.state === 0) {
              alert('用户名已存在')
            } else {
              alert('注册成功')
              this.$router.push('/Login')
            }
          })
          .catch(err => {
          })
      }
    },
    checkForm () {
      if (!this.account) {
        Toast({
          message: '账号不能为空',
        })
        return false
      }
      if (!this.password) {
        Toast({
          message: '密码不能为空',
        })
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss">
.register-container {
  height: 100%;
  text-align: center;
  background: url('../../assets/img/login.jpg');
  padding-top: 1rem;
  font-size: 0.14rem;
}

.login-box {
  width: 2rem;
  height: 3rem;
  margin: auto;

  .login-button {
    width: 1rem;
    margin-top: 0.2rem;
    margin-bottom: 0.1rem;
  }

  .register-psw {
    margin-top: 20px;
  }
}

.Register {
  text-align: right;
  color: #26a00f;
}

.register-container {
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
