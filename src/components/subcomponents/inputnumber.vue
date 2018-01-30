<template>
  <div>

<div @click="substric" class="left">-</div>
<div class="middle">{{count}}</div>
<div @click="add" class="right">+</div>
  </div>
</template>
<style scoped>
   .left,.middle,.right{
       display: inline-block;
       width: 28px;
       height: 28px;
       line-height: 28px;
       text-align: center;
       border:1px solid rgba(92,92,92,0.3);
   }
</style>


<script>
    export default {
        data(){
            return{
                count:1
            }
        },

        props: ['initCount','goodsId'],
        created(){
            this.count = this.initCount
        },

        methods:{
            substric(){
                if(this.count<=1) return
                this.count--
                this.notify()
            },
            add(){
                this.count++
                this.notify()
            },

            notify(){
                this.$emit('numberChange',
                {goodsId:this.goodsId,count:this.count})
            }
        }
    }
</script>