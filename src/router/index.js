import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/login/Login'

const Register = () => import('../view/login/Register')
const Home = () => import ('../view/Home')
const ChatList = () => import('../view/ChatList/ChatList')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    }
    ,
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    ,
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/ChatList',
          name: 'ChatList',
          component: ChatList
        }
      ]
    }
  ]
})
