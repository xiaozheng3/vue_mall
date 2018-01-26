//导包
//es5 var Vue = require('vue')
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import ElementUI from 'element-ui'

//基于Vue的组件，需要使用Vue.use(xxx)
Vue.use(VueRouter) //Vue.property.$route  Vue.property.$router
Vue.use(ElementUI)
//导入全局用到的样式

Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://39.108.135.214:8899/"


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


const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site',component:layout,children:[
            {path:'goodslist',component:goodslist}
        ]}
    ]
})


new Vue({
    el:"#app",
    router,
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render:h=>h(App)
})