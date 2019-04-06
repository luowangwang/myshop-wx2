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
        <!-- 商品列表 -->
        <div class="floor" :key='index' v-for='(item, index) in floor'>
          <!-- 楼层头部 -->
          <div class="floor-title">
            <img :src="item.floor_title.image_src" alt="" mode='aspectFill'>
          </div>
          <!-- 楼层主体部分 -->
          <div class="floor-content">
            <div class="left">
              <img :src="item.product_list[0].image_src" alt="" mode='aspectFill'>
            </div>
            <div class="right">
              <img v-if='i > 0' :key='i' v-for='(img, i) in item.product_list' :src="img.image_src" alt="" mode='aspectFill'>
            </div>
          </div>
        </div>
        <!-- 回到顶部 -->
        <div class="toTop" v-if='isShow' @click="toTop">
          ︿
          <p>顶部</p>
        </div>
    </div>
</template>
<script>
import request from '../../utils/request.js'
export default {
  data () {
    return {
      imgUrls: [],
      menuImageData: [],
      floor: [],
      isShow: false
    }
  },
  methods: {
    // 提取请求封装函数
    async queryData (path) {
      let res = await request(path)
      return res.data.message
    },
    //   获取轮播图数据
    async swiperData () {
    // 方法一
    //   let that = this
    //   mpvue.request({
    //     url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
    //     success: function (res) {
    //       let {message} = res.data
    //       that.imgUrls = message
    //     }
    //   })

    // 方法二
    //   let url = 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata'
    //   request(url, 'get', {}, {}, () => {
    //     console.log(1)
    //   })

    // 方法三
    //   let url = 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata'
    //   request(url).then(res => {
    //     console.log(res)
    //   })

    // 方法四
    // let url = 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata'
    // let res = await request(url)
    // let {message} = res.data
    // console.log(message)

    // 方法五
    // let res = await request('home/swiperdata')
    // // let {message} = res.data
    // // console.log(message)
    // this.imgUrls = res.data.message

    // 方法六
      this.imgUrls = await this.queryData('home/swiperdata')
    },
    // 获取菜单栏数据
    async menuData () {
      // let that = this
      // mpvue.request({
      //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
      //   success: function (res) {
      //     let {message} = res.data
      //     that.menuImageData = message
      //   }
      // })
      // let res = await request('home/catitems')
      // // let {message} = res.data
      // this.menuImageData = res.data.message
      this.menuImageData = await this.queryData('home/catitems')
    },
    // 获取楼层数据
    async floorData () {
      this.floor = await this.queryData('home/floordata')
    },
    // 回到顶部
    toTop () {
      mpvue.pageScrollTo({
        scrollTop: 0
      })
    },
    async initData () {
      this.imgUrls = await this.queryData('home/swiperdata')
      this.menuImageData = await this.queryData('home/catitems')
      this.floor = await this.queryData('home/floordata')
    }
  },
  mounted () {
    // this.swiperData()
    // this.menuData()
    // this.floorData()
    this.initData()
  },
  // 页面滚动
  onPageScroll (event) {
    // console.log(123)
    // console.log(event.scrollTop)
    this.isShow = event.scrollTop > 50
  },
  // 下拉刷新
  onPullDownRefresh () {
    // console.log(123)
    // 下拉刷新 重新加载页面数据
    // this.swiperData()
    // this.menuData()
    // this.floorData()
    this.initData()
  }
}
</script>

<style scoped lang="scss">
  @import "main.scss"
</style>

