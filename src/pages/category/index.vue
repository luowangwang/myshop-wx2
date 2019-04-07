<template>
    <div>
        <!-- 搜索条 -->
        <search-bar></search-bar>
        <!-- 菜单和内容 -->
        <div class="content">
            <div class="left">
                <div @click="changeBrand(index)" :class="{active: currentIndex === index}" class="menu-item" :key="index" v-for="(item, index) in cate">
                    {{item.cat_name}}
                </div>
            </div>
            <div class="right">
                <div class="brand-item" :key="i" v-for="(item, i) in rightData">
                    <div class="brand-title">{{item.cat_name}}</div>
                    <div class="brand-list">
                        <div class="brand" :key="img.cat_id" v-for="img in item.children">
                            <img :src="img.cat_icon" alt="">
                            <p>{{img.cat_name}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import searchBar from '../../components/searchBar'
import request from '../../utils/request'
export default {
  data () {
    return {
      cate: [],
      currentIndex: 0,
      rightData: []
    }
  },
  methods: {
    async cateData () {
      let ret = await request('categories')
      this.cate = ret.data.message
    },
    changeBrand (i) {
    //   console.log(i)
      this.currentIndex = i
      this.rightData = this.cate[this.currentIndex].children
    }
  },
  async mounted () {
    await this.cateData()
    // 根据当前索引取出对应的右侧数据
    this.rightData = this.cate[this.currentIndex].children
    // console.log(this.rightData)
  },
  components: {
    'search-bar': searchBar
  }
}
</script>
<style lang="scss" scoped>
  @import 'main.scss';
</style>
