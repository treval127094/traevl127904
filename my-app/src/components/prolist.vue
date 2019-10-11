<template>
  <div>
 <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="back('/')"  :border='false'>
  <van-icon name="search" slot="right" />
</van-nav-bar>



<van-tabs :border='false'>
  <van-tab :title="item.title" v-for="(item,index) in navtitle" :key="index" >
   <itemlist :idx="id" :number="item.type"></itemlist>
 
  </van-tab>
</van-tabs>

  </div>
</template>

<script>
import itemlist from "../components/itemlist.vue"
export default {
  data() {
    return {
          id:0,
          title:'',
          navtitle:[],
          num:0,   //用来通过上面标签的type 来决定下面的的内容
    }
  },
  components:{
    'itemlist':itemlist
  },
  methods: {
  back(str){
    this.$router.push({
						path:str
					})
  }
 
  },
created() {
   this.id = this.$route.params.id;
  this.title = this.$route.params.title

     this.$axios.get(`/api/api/v3/m1/product/list/type?keywords=&theme_id=${this.id}&district_id=&platform=4`).then((res)=>{
    this.navtitle=res.data.data.list
    // console.log(this.navtitle)
    })
},
}
</script>

<style>
.fade-in-active, .fade-out-active{
    transition: all 0.5s ease 
} 
.fade-in-enter, .fade-out-active{
     opacity: 0 
}
</style>