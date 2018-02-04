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
Vue.use(ElementUI) //Vue.property.$message
Vue.use(VueLazyLoad,{
    loading:'src/statics/site/images/01.gif'
})
Vue.use(Vuex) //Vue.property.$store

//不是基于Vue的插件，如果想绑定到Vue上面
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://39.108.135.214:8899/"
//在跨域的时候，允许访问服务器带上cookies
axios.defaults.withCredentials = true

//全局过滤器
Vue.filter('dateFmt',(input,formatString="YYYY-MM-DD")=>{
    // const lastFormatString = formatString || "YYYY-MM-DD"

    return moment(input).format(formatString)
})

//导入全局用到的样式
import 'element-ui/lib/theme-chalk/index.css'
import "./statics/site/css/style.css"

//导入根组件
//es5  var App = require('./App.vue')
import App from './App'

//路由相关
//导入组件
import layout from './components/layout'
import goodslist from './components/goods/goodslist'
import goodsinfo from './components/goods/goodsinfo'
import shopcart from './components/shopcart/shopcart'
import order from './components/order/order'
import login from './components/account/login'
import payOrder from './components/pay/payOrder'
import pcPaySuccess from './components/pay/pcPaySuccess'
import vipCenter from './components/vip/vipCenter'
import myOrders from './components/vip/myOrders'
import orderInfo from './components/vip/orderInfo'


 

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site',component:layout,children:[
            {name:'goodslist',path:'goodslist',component:goodslist},
            {path:'goodsinfo/:goodsId',component:goodsinfo},
            {path:'shopcart',component:shopcart},
            {name:'login',path:'login',component:login},
            //下面开始，需要进行登录验证
            {path:'order/:ids',component:order,meta:{needLogin:true}},
            {path:'payOrder/:orderid',component:payOrder,meta:{needLogin:true}},
            {path:'success',component:pcPaySuccess,meta:{needLogin:true}}, {path:'vipCenter',component:vipCenter,meta:{needLogin:true}},
            {path:'myOrders',component:myOrders,meta:{meedLogin:true}},
            {path:'orderInfo/:orderid',component:orderInfo,meta:{needLogin:true}}


        ]}
    ]
})

/**
 * 路由守卫
 * 
 * to 跳转到哪里去
 * from 从哪里跳转过来
 * next 调用next就会触发路由，调用它，就不会触发路由
 */
router.beforeEach((to, from, next) => {
    //记录要去的路径
    if(to.path!='/site/login'){
        localStorage.setItem('lastVisitPath',to.path)
    }

    //2、判断即将跳转的组件中的路径(to)里面是否需要进行权限验证，如果需要权限验证，就发送请求给后台
    //如果不需要权限验证，直接跳过
    if(to.meta.needLogin){//需要登录的组件
        //判断登录
        const url = "site/account/islogin"

        axios.get(url).then(response=>{
            console.log(response.data)
            if(response.data.code==='nologin'){
                //跳转到登录页面上面去
                router.push({name:'login'})
            }else{
                next()
            }
        })
    }else{
        next()
    }
})

//全局数据存储相关
//导入localStorageTool中的方法
import {
    addLocalGoods,
    getTotalCount,
    updateLocalGoods,
    deleteLocalGoodsById,
    deleteLocalGoodsByIds
} from './common/localStorageTool.js'

const store = new Vuex.Store({
    state:{
        buycount:0 //加入购物车中的商品总数量，用在layout.vue的头部的购物车那个徽标上面
    },
    getters:{//从仓库中获取数据，靠getters
        getBuyCount(state){ //state是固定的
            if(state.buycount>0){//当内存中有的时候
                return state.buycount
            }else{ //重新刷新，再从本地取
                return getTotalCount()
            }
        }
    },
    mutations:{//往仓库中增、删、改数据
        /**
         * 参数1：state 固定写法
         * 参数2：载荷，就是参数
         */
        addGoods(state,goodsObj){
            //保存到本地，统计总数量，赋值给buycount
            state.buycount = addLocalGoods(goodsObj)
        },
        updateGoods(state,changedGoods){
            //修改本地的数量，统计总数量，赋值给buycount
            state.buycount = updateLocalGoods(changedGoods)
        },
        deleteGoodsById(state,goodsId){
            //删除本地商品，统计总数量，赋值给buycount
            state.buycount = deleteLocalGoodsById(goodsId)
        },
        deleteGoodsByIds(state,goodsids){//约定，传递过来的goodsids是一个数组[87,92]
            //根据ids删除本地的商品
            state.buycount = deleteLocalGoodsByIds(goodsids)
        }
    }
})

new Vue({
    el:"#app",
    router,//相当于 router:router
    store,
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render:h=>h(App)
})