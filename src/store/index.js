import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
        account:'',
        headPic:'',
        isShowEmoji:false
    },
    mutations:{
        setEmoji(state, data) {
            state.isShowEmoji = data;
        },
    },
    actions:{
    },
    getters:{
        isShowEmoji:state =>{
            return state.isShowEmoji
        }
    }
})
export default store ;
