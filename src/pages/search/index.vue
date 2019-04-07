<template>
    <div>
        <div class="search">
            <div class="search-content">
                <div class="search-input">
                    <icon type="search" size="16"/>
                    <input @input="inputHandle" v-model='keywords' placeholder="请输入关键字">
                </div>
                <button v-if='keywords' class="cancel">取消</button>
                <!-- 搜索结果展示 -->
                <div class="search-modal">
                    <div :key="item.goods_id" v-for="item in searchResult" class="search-item">
                        {{item.goods_name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import request from '../../utils/request.js'
export default {
  data () {
    return {
      keywords: '',
      searchResult: []
    }
  },
  methods: {
    // 根据输入关键字查询匹配得数据
    async inputHandle () {
      let res = await request('goods/qsearch', 'get', {
        query: this.keywords
      })
      const {message} = res.data
      this.searchResult = message
    }
  }
}
</script>
<style lang="scss" scoped>
    @import "main.scss"
</style>
