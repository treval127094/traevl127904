<template>
  <div>
     <van-nav-bar title="全部主题" left-text="返回" left-arrow @click-left="back('/')"  :border='false'>
  <van-icon name="search" slot="right" />
</van-nav-bar>
<div class="grid">
  <van-grid square :column-num='3' :border='false' icon-size='46px'>
  <van-grid-item
    v-for="(item,index) in theme"
    :key="index"
    :icon="item.img"
    :text="item.label"
    :to="'/prolist/'+item.id+'/'+item.label"
  />
</van-grid>
</div>
  </div>
</template>

<script>
export default {
  data(){
return {
  theme:[]
}
  },
  methods: {
  back(str){
    this.$router.push({
						path:str
					})
  }
 
  },
  created() {
     this.$axios.get(`/api/api/v3/m1/theme/group?platform=4`)
        .then(res => {
         this.theme=res.data.data.list
         console.log(this.theme)
        })
  },
}
</script>

<style scoped>
.grid {
  padding: 40px;
}
 .van-icon__image {
  width: 56px!important;
  height: 56px;
}
</style>