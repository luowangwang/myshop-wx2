<template>
    <div>
        <!-- 搜索框 -->
        <div class="search-bar">
            <div class="search-input">
                <!-- <icon type="search" color="#999" class="seacrh-icon" size="18px"/> -->
                <input type="text" placeholder="搜索">
            </div>
        </div>
        <!-- 轮播图 -->
        <swiper indicator-dots autoplay>
            <swiper-item :key="item.goods_id" v-for="item in imgUrls">
                <image :src="item.image_src" class="slide-image" width="355" height="150" />
            </swiper-item>
        </swiper>
        <!-- 菜单栏 -->
        <div class="menu">
            <div class="menu-item" :key="index" v-for="(item,index) in menuImageData">
                <img :src="item.image_src">
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      imgUrls: [],
      menuImageData: []
    }
  },
  methods: {
    //   获取轮播图数据
    swiperData () {
      let that = this
      mpvue.request({
        url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
        success: function (res) {
          let {message} = res.data
          that.imgUrls = message
        }
      })
    },
    // 获取菜单栏数据
    menuData () {
      let that = this
      mpvue.request({
        url: 'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
        success: function (res) {
        //   console.log(res)
          let {message} = res.data
          that.menuImageData = message
        }
      })
    }
  },
  mounted () {
    this.swiperData()
    this.menuData()
  }
}
</script>

<style scoped>
.search-bar {
  background-color: #eb4450;
  padding: 20rpx;
  text-align: center;
  color: #999;
}
.search-input {
  background-color: #fff;
}
.slide-image {
  width: 750rpx;
}
.menu {
    display: flex;
    justify-content: space-around;
    margin: 15rpx
}
.menu .menu-item img {
    width: 128rpx;
    height: 140rpx;
}
</style>

