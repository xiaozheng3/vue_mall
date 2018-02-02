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
                                <li class="active">
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
                    <el-form :model="order" :rules="rules" ref="orderForm" label-width="150px" class="cart-box demo-ruleForm">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div class="form-box address-info">
                            <dl class="form-group">
                                <el-form-item label="收货人姓名：" prop="accept_name">
                                    <el-input style="width:500px;" v-model="order.accept_name"></el-input>
                                </el-form-item>
                            </dl>
                            <dl class="form-group">
                                <el-form-item label="所属地区：" prop="area">
                                    <v-distpicker :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value" @selected="selectedArea"></v-distpicker>
                                </el-form-item>
                            </dl>
                            <dl class="form-group">
                                <el-form-item label="详细地址：" prop="address">
                                    <el-input style="width:500px;" v-model="order.address"></el-input>
                                </el-form-item>
                            </dl>
                            <dl class="form-group">
                                <el-form-item label="手机号码：" prop="mobile">
                                    <el-input style="width:500px;" v-model="order.mobile"></el-input>
                                </el-form-item>
                            </dl>
                            <dl class="form-group">
                                <el-form-item label="电子邮箱：">
                                    <el-input style="width:500px;" v-model="order.email"></el-input>
                                </el-form-item>
                            </dl>
                            <dl class="form-group">
                                <el-form-item label="邮政编码：">
                                    <el-input style="width:200px;" v-model="order.post_code"></el-input>
                                </el-form-item>
                            </dl>
                        </div>
                        <h2 class="slide-tit">
                            <span>2、支付方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <li>
                                <label>
                                    <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                                    <em>手续费：0.00元</em>
                                </label>
                            </li>
                        </ul>
                        <h2 class="slide-tit">
                            <span>3、配送方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <el-radio-group @change="expressChange" v-model="order.express_id">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio label="1">顺丰快递(20元)</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio label="2">圆通(10元)</el-radio>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <el-radio label="3">韵达(8元)</el-radio>
                                    </label>
                                </li>
                            </el-radio-group>
                        </ul>
                        <h2 class="slide-tit">
                            <span>4、商品清单</span>
                        </h2>
                        <div class="line15"></div>
                        <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                            <tbody>
                                <tr>
                                    <th colspan="2" align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="84" align="center">购买数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                </tr>
                                <tr v-for="item in orderGoodsList" :key="item.id">
                                    <td width="68">
                                        <a target="_blank" href="/goods/show-89.html">
                                            <img :src="item.img_url" class="img">
                                        </a>
                                    </td>
                                    <td>
                                        <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                    </td>
                                    <td>
                                        <span class="red">
                                            ￥{{item.sell_price}}
                                        </span>
                                    </td>
                                    <td align="center">{{item.buycount}}</td>
                                    <td>
                                        <span class="red">
                                            ￥{{item.sell_price * item.buycount}}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="line15"></div>
                        <h2 class="slide-tit">
                            <span>5、结算信息</span>
                        </h2>
                        <div class="buy-foot clearfix">
                            <div class="left-box">
                                <dl>
                                    <dt>订单备注(100字符以内)</dt>
                                    <dd>
                                        <textarea name="message" v-model="order.message" class="input" style="height:35px;"></textarea>
                                    </dd>
                                </dl>
                            </div>
                            <div class="right-box">
                                <p>
                                    商品
                                    <label class="price">{{getTotalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                    <label id="goodsAmount" class="price">{{getGoodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p>
                                    运费：￥
                                    <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                </p>
                                <p class="txt-box">
                                    应付总金额：￥
                                    <label id="totalAmount" class="price">{{getGoodsAmount + order.expressMoment}}</label>
                                </p>
                                <p class="btn-box">
                                    <el-button type="primary">返回购物车</el-button>
                                    <el-button type="success" @click="goToPay()">确认提交</el-button>
                                </p>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
</style>

<script>
    import VDistpicker from 'v-distpicker'

    import { getLocalGoods } from '../../common/localStorageTool'

    export default {
        data() {
            //自定义验证规则
            var checkMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号码不能为空'));
                } else {
                    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

                    if (!myreg.test(value)) {
                        callback(new Error('手机号码不合法'));
                    } else {//手机号码合法
                        callback()
                    }
                }
            }
            return {
                isSubmit:false,
                orderGoodsList: [],//为了纯粹的展示商品信息，不需要提交给后台
                //最终提交给后台的数据对象
                order: {
                    accept_name: '', //收获人姓名
                    area: {
                        "province": {
                            "code": "440000",
                            "value": "广东省"
                        },
                        "city": {
                            "code": "440300",
                            "value": "深圳市"
                        },
                        "area": {
                            "code": "440306",
                            "value": "宝安区"
                        }
                    },
                    address: "中粮商务公园",//详细地址
                    mobile: '13812345678',//手机号码
                    email: 'abc@itcast.cn',//电子邮箱
                    post_code: '518000',//邮编
                    payment_id: '6',//在线支付
                    express_id: '1',//快递方式 1：顺丰 2：圆通  3：韵达
                    expressMoment: 20,//快递费用，默认是20元
                    goodsAmount: 0,//商品的总价格，除开了快递费用的
                    message: "请尽快发货",//留言
                    goodsids:null,//购买商品的ids
                    cargoodsobj:null//购买商品的详细信息
                },
                rules: {
                    accept_name: [
                        { required: true, message: '请输入收货人姓名', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    mobile: [
                        // { required: true, message: '请输入手机号码', trigger: 'blur' }
                        { required: true, validator: checkMobile, trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请选择所属地区', trigger: 'blur' }
                    ]
                }
            }
        },
        components: { VDistpicker },
        computed: {
            //获取总数量
            getTotalCount() {
                let totalCount = 0
                this.orderGoodsList.forEach(item => {
                    totalCount += item.buycount
                })

                return totalCount
            },
            //获取商品的金额
            getGoodsAmount() {
                let goodsAmount = 0
                this.orderGoodsList.forEach(item => {
                    goodsAmount += item.sell_price * item.buycount
                })

                this.order.goodsAmount = goodsAmount

                return goodsAmount
            }
        },
        created() {
            // this.order.accept_name = localStorage.getItem("accept_name")

            this.getOrderGoodsListData()
        },
        beforeDestroy(){
            // if(!this.isSubmit){
            //     console.log("---------保存未提交----")
            //     localStorage.setItem("accept_name",this.order.accept_name)
            // }
        },
        methods: {
            //获取下单时候的商品信息，展示给用户看
            getOrderGoodsListData() {
                const url = `site/validate/order/getgoodslist/${this.$route.params.ids}`

                const localGoods = getLocalGoods()

                this.$axios.get(url).then(response => {
                    //给order的goodsids设置值
                    this.order.goodsids = this.$route.params.ids

                    //给order的cargoodsobj设置值
                    this.order.cargoodsobj = {}

                    response.data.message.forEach(item => {
                        item.buycount = localGoods[item.id]

                        //给this.order.cargoodsobj赋值
                        //展示商品
                        this.order.cargoodsobj[item.id] = item.buycount
                    });
                    this.orderGoodsList = response.data.message
                })
            },
            //当选中了省市区的区之后，会触发
            selectedArea(data) {
                //将选中的数据，赋值给模型
                this.order.area = data
            },
            //更改快递方式触发的事件
            expressChange(label) {
                //更改快递的方式
                this.order.express_id = label
                switch (label) {
                    case "1":
                        //更改快递的费用
                        this.order.expressMoment = 20
                        break;

                    case "2":
                        this.order.expressMoment = 10
                        break;

                    case "3":
                        this.order.expressMoment = 8
                        break;

                    default:
                        break;
                }
            },
            goToPay() {//下订单
                this.$refs.orderForm.validate((valid) => {
                    if (valid) {
                       const url = "site/validate/order/setorder"

                       this.$axios.post(url,this.order).then(response=>{
                           if(response.data.status == 1){
                               //失败
                               this.$message.error(response.data.message)
                               return
                           }

                           //1、清理localStorage中已经下过单的商品&&重新统计购物车徽标中的总数
                           //87,92 ===> 
                           const goodsids = this.$route.params.ids.split(',')
                           this.$store.commit('deleteGoodsByIds',goodsids)

                           //2、成功之后，通过编程式导航，跳转到支付组件中去，并且还要带上，订单id
                           this.$router.push({path:`/site/payOrder/${response.data.message["orderid"]}`})
                       })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>