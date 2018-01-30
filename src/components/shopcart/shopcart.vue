<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodsList" :key="item.id">
                                    <td align="center">
                                        <el-switch v-model="item.isSelected" active-color="#0094ff" inactive-color="#333333">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div style="display:flex;align-items:center">
                                            <img width="50" height="50" :src="item.img_url" alt="">&nbsp;&nbsp;
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td align="left">
                                        {{item.sell_price}}
                                    </td>
                                    <td align="center">
                                        <inputnumber @numberChange="getChangedNumber" :initCount="item.buycount" :goodsId="item.id"></inputnumber>
                                    </td>
                                    <td align="left">
                                        {{item.sell_price * item.buycount}}
                                    </td>
                                    <td align="center">
                                        <a href="javascript:void(0)" @click="deleteGoods(item.id,index)">删 除</a>
                                    </td>
                                </tr>
                                <tr v-if="goodsList.length<=0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="goBuy()" >继续购物</button>
                            <button class="submit" @click="goToOrder()" >立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getLocalGoods } from '../../common/localStorageTool'

    import inputnumber from '../subcomponents/inputnumber'

    export default {
        data(){
            return {
                goodsList:[]
            }
        },
        components : {
            inputnumber
        },

        computed: {
            getTotalCount(){
                let totalCount = 0
                this.goodsList.forEach(item=>{
                    if(item.isSelected){
                        totalCount += item.buycount
                    }
                })

                return totalCount
            },

            getTotalPrice(){
                let totalPrice = 0
                this.goodsList.forEach(item=>{
                    if(item.isSelected){
                        totalPrice+=item.buycount * item.sell_price
                    }
                })

                return totalPrice
            }
        },
        created(){
            this.getGoodsListData()
        },

        methods:{
            getGoodsListData(){
                const localObj = getLocalGoods()

                let tempArray = []

                for(const key in localObj){
                    tempArray.push(key)

                }

                if(tempArray.length<=0) return
                const url = `site/comment/getshopcargoods/${tempArray.join(',')}` 

                this.$axios.get(url).then(response =>{
                    response.data.message.forEach(item=>{
                        item.buycount = localObj[item.id]
                        item.isSelected = true
                    })

                    this.goodsList = response.data.message
                })
            },

            getChangedNumber(changedGoods){
                this.goodsList.forEach(item=>{
                    if(changedGoods.goodsId == item.id){
                        item.buycount = changedGoods.count
                    }
                })

                this.$store.commit('updateGoods',changedGoods)
            },

            deleteGoods(goodsId,index){
                 this.$confirm('是否删除该商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   //1.0 根据goodsId 删除localStorage中的数据
                   this.$store.commit('deleteGoodsById',goodsId)

                   //2.0 删除goodsList中的数据
                   this.goodsList.splice(index,1)
                }).catch(() => {
                   
                });
            },

            goBuy(){
                this.$router.push({path:'/site/goodslist'})

            },

            goToOrder(){


            
                const ids = []

                this.goodsList.forEach(item=>{
                    if(item.isSelected){
                        ids.push(item.id)
                    }
                })

                if(ids.length<=0){
                       this.$message.error('请至少选择一个商品进行结算!');
                    return

                }

                this.$router.push(`/site/order/${ids.join(',')}`)

                    console.log(11111)
            }
        }
    }
</script>