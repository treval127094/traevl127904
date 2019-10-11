<template>
  <div class="max">
<div v-for="(item,index) in listdata" :key="index" class="max-box"  @click="jump('message',item.id)"> 
  <div class="pic">
    <img :src="item.img" alt="">
     <div class="tiptag">{{item.tip_mark}}</div>
    <div class="price"><small>￥</small>{{item.price}}<small>起</small>
    <div class="tanger"></div>
</div>

  </div>
  <p class="product-tittle">{{item.title}}</p>
  <p class="product-subtittle">{{item.subtitle}}</p>
  <div class="tags">
    <span class="tag1" v-for="(item2,index2) in item.mark" :key="index2">{{item2.name}}</span>
  </div>
 
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    listdata:[]
    }
  },
props:{
  idx:{
    type:String
  },
  number:{
    type:Number
  },
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
created() {
    this.$axios.get(`/api/api/v3/m1/product/list?page=1&keywords=&theme_id[]=${this.idx}&district_id[]=&order_by=6&type=${this.number}&platform=4`).then((res)=>{
    this.listdata=res.data.data.list
    })
 
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
.price {
      padding: 3Px 7Px 3Px 3Px;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    bottom: 4px;
    right: -4px;
    color: white;
    font-size: 14px;
}
.tiptag {
    position: absolute;
  top: 0;
  right: 4px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 2px;
  padding: 2px;
}
.tags {
  margin-top: 6px;
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
.max-box {
  margin-bottom: 20px;
}
.product-tittle {
  font-size: 16px;
  color: #333333;
  text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  margin-top: 8px;
}
.product-subtittle {
  font-size: 12px;
      color: #898989;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.max {
  padding: 0 10px;
  margin-top: 20px;
}
.pic {
   height: 186px;
  width: 100%;
  /* overflow: hidden; */
  position: relative;
}
.pic img {
  width: 100%;
  height: 100%;
  border-radius: 4px;

}
</style>