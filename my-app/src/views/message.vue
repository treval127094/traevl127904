<template>
  <div>
    <div class="banner">
      <van-icon name="arrow-left" @click="back('/')" />
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in banner" :key="index">
          <div class="banner">
            <img :src="item.url" alt />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="induce">
      <p class="title">{{lisdata.title}}</p>
      <p class="label">{{lisdata.label}}</p>
      <div class="name-max">
        <div v-for="(item,index) in lisdata.mark" :key="index" class="name">{{item.name}}</div>
      </div>
      <p class="price">
        <small>参考报价 ￥</small>
        {{lisdata.min_price}}
        <small>起/人</small>
      </p>
    </div>

    <div class="tag">
      <!-- <van-tabs v-model="tabActive">
        <van-tab :title="item" v-for="(item,index) in arr" :key="index" > -->
          <template v-if="content">
            <p class="hight" ref="tab1">体验亮点</p>
            <div v-html="content"></div>
          </template>
          <template v-if='hotel'>
              <p class="hight">酒店信息</p>
          <div v-for="(item,index) in hotel" :key="index" class="max-box">
            <div class="pic1">
              <img :src="item.img" alt />
            </div>
            <p class="name_cn">{{item.name_cn}}</p>
            <p class="name_en">{{item.name_en}}</p>
          </div>
          </template>
        <template v-if='day'>
            <p class="hight" ref="tab2">行程概述</p>
          <div>
            <van-steps :active="active" active-icon="success" direction="vertical">
              <van-step v-for="(item,index) in day" :key="index">
                <span>第{{item.day}}天：</span>
                <span>{{item.title}}</span>
              </van-step>
            </van-steps>
          </div>
        </template>
        <template v-if='lisdata.www_fee_contain'>
           <p class="hight" ref="tab3">费用包含</p>
          <div v-html="lisdata.www_fee_contain"></div>
        </template>
     <template v-if="lisdata.www_fee_not_contain">
           <p class="hight">费用不含</p>
          <div v-html="lisdata.www_fee_not_contain"></div>
     </template>
        <template v-if="lisdata.www_fee_not_contain">
          <p class="hight">预定须知</p>
          <div v-html="lisdata.www_fee_not_contain"></div>
        </template>
        
        <!-- </van-tab>
      </van-tabs> -->
    </div>
    <van-submit-bar button-text="我要定制">
      <span class="service">
        <van-icon name="service-o" />
客服
      </span>
      <span class="like">
        <van-icon name="like-o" />收藏
      </span>
    </van-submit-bar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: 2000,
        banner: [],
        lisdata: {},
        city: "",
        arr: ["亮点", "行程", "报价说明"],
        content: "",
        a: 0,
        hotel: [],
        active: -1,
        tabActive: 0,
        day: []
      };
    },
    created() {
      this.id = this.$route.params.info;

      console.log(this.id);

      this.$axios
        .get(`/api/api/v3/m1/product/detail?product_id=${this.id}&platform=4`)
        .then(res => {
          // console.log(res.data.data)
          this.lisdata = res.data.data;
          this.banner = res.data.data.product_img_www;
          //  this.city=res.data.data.group_list[0].list[0].name
          // if(res.data.data.feature[0].content){
          this.content = res.data.data.feature[this.a] && res.data.data.feature[this.a].content;
          if (!this.content) {
            this.arr.splice(0,1)
          }
          if(!this.day){
            this.arr.splice(1,1)
          }
          if(!this.lisdata.www_fee_contain){
            this.arr.splice(2,1)
          }
          this.hotel = res.data.data.hotel;
          this.day = res.data.data.plan_overview["10000:1554;20000:5043"];
        });
    },
    methods: {
      handleClick (a) {
        console.log(a)
      },
      showPopup() {
        this.show = true;
      },
      back(str) {
        this.$router.push({
          path: str
        });
      }
    },
    watch: {
      tabActive(to,from) {
        let len = this.$refs['tab'+(to+1)].length-1
        let last = this.$refs['tab'+(to+1)][len]
        console.log(last.offsetTop)
        // window.scrollTop = this.$refs['tab'+to].offsetTop
      }
    },
  };
</script>

<style scoped>
  .van-icon-arrow-left {
    position: absolute;
    left: 15px;
    top: 15px;
    z-index: 100;
    color: white;
    font-size: 20px;
  }
  .like {
    margin-right: 2.533333rem;
  }
  .van-submit-bar__bar {
    justify-content: space-between;
    padding-left: 30px;
  }
  .max-box {
    border-bottom: 1px solid #e2e2e2;
  }
  .pic1 {
    margin-bottom: 30px;
  }
  .name_cn {
    font-family: PingFangSC-Light;
    font-size: 0.37333rem;
    color: #333333;
    letter-spacing: 0.004rem;
    text-align: center;
    margin-bottom: 9px;
  }
  .name_en {
    font-family: PingFangSC-Light;
    font-size: 0.37333rem;
    color: #333333;
    letter-spacing: 0.004rem;
    text-align: center;
    margin-bottom: 30px;
  }
  .van-cell {
    width: 80px;
  }
  .chose {
    display: flex;
    justify-content: space-between;
  }
  .price {
    font-size: 18px;
    text-align: center;
    color: #c04374;
    border-bottom: 1px solid #e2e2e2;
    padding-bottom: 0.53333rem;
  }
  small {
    font-size: 14px;
  }
  small:nth-of-type(2) {
    color: #898989;
  }
  .name-max {
    display: flex;
    justify-content: center;
    margin: 0.4rem auto 0.53333rem;
  }
  .name {
    /* padding: 0.08rem 0.21333rem; */
    padding: 0 5px;
    background: #ffffff;
    /* border-radius: 0.08rem; */
    font-family: PingFangSC-Light;
    font-size: 0.26667rem;
    color: #333333;
    letter-spacing: 0.004rem;
    text-align: center;
    font-weight: 300;
    border: 1px solid #000000;
    margin: 0 0.10667rem;
  }

  .label {
    margin-top: 0.4rem;
    font-family: PingFangSC-Light;
    font-size: 0.32rem;
    color: #333333;
    letter-spacing: 0.008rem;
    text-align: center;
    font-weight: 300;
    font-size: 12px;
  }
  .title {
    margin-top: 16px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: PingFangSC-Light;
    font-size: 0.48rem;
    color: #333333;
    letter-spacing: 0.01333rem;
  }
  .banner {
    width: 375px;
    height: 375px;
  }
  .banner img {
    width: 100%;
    height: 100%;
  }
</style>