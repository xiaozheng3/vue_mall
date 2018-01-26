<template>
  <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodsData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}&nbsp;
                                            </span>
                                       
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{subitem.title}}</a>
                                               
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                               <el-carousel :interval="5000" arrow="always">
                                    <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                        <img :src="item.img_url" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/右侧-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goodsData.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | dateFmt}}</span>
                                </div>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
       <div class="section">
            <div class="main-tit">
                <h2>手机数码</h2>
                <p>
                    <a href="/goods/43.html">手机通讯</a>
                    <a href="/goods/43.html">摄影摄像</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li>
                            <a href="#/site/goodsinfo/87" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200046589514.jpg">
                                </div>
                                <div class="info">
                                    <h3>华为（HUAWEI）荣耀6Plus 16G双4G版</h3>
                                    <p class="price">
                                        <b>2195</b>元</p>
                                    <p>
                                        <strong>库存 60</strong>
                                        <span>市场价：
                                            <s>2499</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/88" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200059017695.jpg">
                                </div>
                                <div class="info">
                                    <h3>苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）</h3>
                                    <p class="price">
                                        <b>5780</b>元</p>
                                    <p>
                                        <strong>库存 198</strong>
                                        <span>市场价：
                                            <s>6388</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/89" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200119256512.jpg">
                                </div>
                                <div class="info">
                                    <h3>小米（Mi）小米Note 16G双网通版</h3>
                                    <p class="price">
                                        <b>2299</b>元</p>
                                    <p>
                                        <strong>库存 59</strong>
                                        <span>市场价：
                                            <s>2699</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/90" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200154277661.jpg">
                                </div>
                                <div class="info">
                                    <h3>佳能（Canon） EOS 700D 单反套机</h3>
                                    <p class="price">
                                        <b>4799</b>元</p>
                                    <p>
                                        <strong>库存 100</strong>
                                        <span>市场价：
                                            <s>5099</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#/site/goodsinfo/91" class="">
                                <div class="img-box">
                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200214471783.jpg">
                                </div>
                                <div class="info">
                                    <h3>尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</h3>
                                    <p class="price">
                                        <b>3180</b>元</p>
                                    <p>
                                        <strong>库存 10</strong>
                                        <span>市场价：
                                            <s>3150</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
    .el-carousel__container{
        height: 341px;
    }

    .el-carousel__item img {
        width: 100%;
        height: 100%;
    }
</style>


<script>
    export default {
        data(){
            return{
                goodsData:{}
            }
        },
        created (){
            this.getGoodsData()
        },
        methods:{
            getGoodsData(){
                const url = "site/goods/gettopdata/goods"

                this.$axios.get(url).then(response=>{
                    this.goodsData = response.data.message
                })
            }
        }
    }
</script>