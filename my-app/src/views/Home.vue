<template>
<div>
  <van-search
  placeholder="泰国"
  use-action-slot
  bind:search="onSearch"
  shape='round'
  readonly
  input-align='center'
>
  <view slot="action" bind:tap="onSearch">搜索</view>
</van-search>
<div class="banner">
  <van-swipe :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="(item,index) in banner" :key="index">
    <img :src="item.img" alt="">
  </van-swipe-item>
</van-swipe>
</div>

<div class="grid">
  <van-grid square :column-num='5' :border='false'>
  <van-grid-item
    v-for="(item,index) in grid"
    :key="index"
    :icon="item.img"
    :text="item.title"
    :to="item.id==-1?'/theme':'/prolist/'+item.id+'/'+item.title"
  />
</van-grid>
</div>
<div class="content" v-for='(item,index) in product' :key="index">
  <p>{{item.title}}</p>
  <van-swipe :loop="false" :width="339" :show-indicators='false'>
  <van-swipe-item v-for='(item1,index1) in item.list' :key="index1"  @click="jump('message',item1.id)">
  <img :src="item1.img" alt="">
  <p class="product-tittle">{{item1.title}}</p>
  <p class="product-subtittle">{{item1.subtitle}}</p>
  <div class="tags">
    <span class="tag1" v-for="(item2,index2) in item1.mark" :key="index2">{{item2.name}}</span>
  </div>
  <div class="tiptag">{{item1.tip_mark}}</div>
  <div class="price"><small>￥</small>{{item1.price}}<small>起</small>
  <div class="tanger"></div>
  </div>
  </van-swipe-item>

</van-swipe>
</div>




</div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
data() {
  return {
    banner:{},
    grid:[],
    product:[],
  }
},
created() {
  this.$axios.get('/api/api/v3/m1/homepage?platform=4').then((res)=>{
    console.log(res.data.data)
    this.banner=res.data.data.banner.list
    this.grid=res.data.data.theme_list
    this.product=res.data.data.product
    // console.log(this.$router)
    })
},
methods: {
  jump(str,info){
    this.$router.push({
							name:str,
						  params:{
							'info':info
						}
					})
  }
},
}
</script>
<style scoped>
.tanger {
        width: 0;
				height: 0;
				border: 4px solid transparent;
				border-bottom-color: rgba(0, 0, 0, 0.7);
				border-top: none;
				border-left-color: transparent;
				border-right-color: transparent;
        position: absolute;
        right: 0px;
        top: -4px;
        z-index: -1;
}
.product-subtittle {
  font-size: 12px;
      color: #898989;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.price {
      padding: 3Px 7Px 3Px 3Px;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    bottom: 83px;
    right: 16px;
    color: white;
    font-size: 14px;
}
.tiptag {
  position: absolute;
  top: 0;
  right: 30px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 2px;
  padding: 2px;
}
.product-tittle {
  font-size: 16px;
  color: #333333;
  text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  margin-top: 8px;
}
.tags {
  margin-top: 10px;
}
.tag1 {
  display: inline-block;
  color: #92D39F;
  padding: 2px 4px;
  border-radius: 2px;
  background: rgba(146, 211, 159, 0.2);
  font-size: 12px;
  margin-left: 10px;
}
.content {
  padding-left: 12px;
  margin-top: 40px;
}
.content>p:nth-of-type(1) {
    font-size: 16px;
  }
.content img {
  height: 179px;
  width: 100%;
  border-radius: 4px;

}
.content .van-swipe-item {
  overflow: hidden;
  padding-right: 20px;
  margin-top: 8px;
  position: relative;
}
.van-grid-item__content {
  padding: 0 !important;
  /* text-align: center */
}
.grid{
  padding: 0 12px;
margin-top: 10px;
}
/* .grid img {
  width: 40px;
  height: 40px;
} */

 .grid .van-icon__image {
  width: 40px;
  height: 40px;
}
.van-search {
  /* background-color: yellow !important; */
  position: relative;
}
.van-field__left-icon {
  position: absolute;
  left: 50%;
  margin-left: -36px;
}
.banner {
  padding: 0 12px;
  margin-top: 5px;
}
.banner .van-swipe {
 border-radius: 8px;
overflow: hidden;
}
.banner .van-swipe-item {
  /* padding: 0 12px; */
  text-align: center;

}
.van-grid-item {
  margin-top: 10px;
}
.banner .van-swipe-item img {
 width: 100%;
 height: 150px;
}
</style>