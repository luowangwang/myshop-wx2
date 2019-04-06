<template>
    <div>
        <!-- 搜索条 -->
        <search-bar></search-bar>
        <!-- 菜单和内容 -->
        <div class="content">
            <div class="left">
                <div :class="{active: currentIndex === index}" class="menu-item" :key="index" v-for="(item, index) in cate">
                    {{item.cat_name}}
                </div>
            </div>
            <div class="right"></div>
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
      currentIndex: 0
    }
  },
  methods: {
    async cateData () {
      let ret = await request('categories')
      this.cate = ret.data.message
    }
  },
  mounted () {
    this.cateData()
  },
  components: {
    'search-bar': searchBar
  }
}
</script>
<style lang="scss" scoped>
  @import 'main.scss';
</style>
