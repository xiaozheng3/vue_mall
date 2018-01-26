//导包
//es5 var Vue = require('vue')
import Vue from 'vue'
import VueRouter from 'vue-router'

//基于Vue的组件，需要使用Vue.use(xxx)
Vue.use(VueRouter) //Vue.property.$route  Vue.property.$router

//导入全局用到的样式
import "./statics/site/css/style.css"

//导入根组件
//es5  var App = require('./App.vue')
import App from './App'

new Vue({
    el:"#app",
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render:h=>h(App)
})