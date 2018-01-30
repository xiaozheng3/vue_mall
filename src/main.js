//导包
//es5 var Vue = require('vue')
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'
import Vuex from 'vuex'


//基于Vue的组件，需要使用Vue.use(xxx)
Vue.use(VueRouter) //Vue.property.$route  Vue.property.$router
Vue.use(ElementUI)
//导入全局用到的样式
Vue.use(VueLazyLoad,{
    loading:'src/statics/site/images/01.gif'
})

Vue.use(Vuex)

Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://39.108.135.214:8899/"

                 //YYYY-MM-DD HH:mm:ss
Vue.filter('dateFmt',(input,formatString="YYYY-MM-DD")=>{
    return moment(input).format(formatString)
})

import 'element-ui/lib/theme-chalk/index.css'

import "./statics/site/css/style.css"

//导入根组件
//es5  var App = require('./App.vue')
import App from './App'


import layout from './components/layout'
import goodslist from './components/goods/goodslist'
import goodsinfo from './components/goods/goodsinfo'
import shopcart from './components/shopcart/shopcart'


const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site',component:layout,children:[
            {path:'goodslist',component:goodslist},
            {path:'goodsinfo/:goodsId',component:goodsinfo},
            {path:'shopcart',component:shopcart}
        ]}
    ]
})
//全局数据储存 导入localStorgeTool中的方法
import {addLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoodsById} from './common/localStorageTool.js'

const store = new Vuex.Store({

    state :{
        buycount:0 //加入购物车的商品总数量  ,用在layout.vue的头部购物车

    },

    getters:{ //从仓库中获取数据 靠getters
        getBuyCount(state){ //state 是固定的
            if(state.buycount>0){ //当内存中有的时候
                return state.buycount
            }else{  //重新刷新 再从本地取
                return getTotalCount()
            }
        }
    },
    mutations:{
        addGoods(state,goodsObj){
         state.buycount = addLocalGoods(goodsObj)
        },
        updateGoods(state,changeGoods){
            state.buycount = updateLocalGoods(changeGoods)
        },
        deleteGoodsById(state,goodsId){
            state.buycount = deleteLocalGoodsById(goodsId)
        }
    }
})


new Vue({
    el:"#app",
    router,
    store,
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render:h=>h(App)
})