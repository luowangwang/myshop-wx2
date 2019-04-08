<template>
    <div>
        <div class="search">
            <div class="search-content">
                <div class="search-input">
                    <icon type="search" size="16"/>
                    <input @confirm="confirmHandle" @input="inputHandle" v-model='keywords' placeholder="请输入关键字">
                </div>
                <button v-if='keywords' class="cancel" @click="cancelHandle">取消</button>
                <!-- 搜索结果展示 -->
                <div v-if="keywords" class="search-modal">
                    <div :key="item.goods_id" v-for="item in searchResult" class="search-item">
                        {{item.goods_name}}
                    </div>
                </div>
            </div>
        </div>
        <!-- 历史关键字 -->
        <div class="history">
            <h4>搜索历史</h4>
            <icon type='clear' size='16' @click="clearHistory"/>
        </div>
        <div class="history-list">
            <div :key="index" v-for="(item, index) in keywordsHistory" class="history-item">
                {{item}}
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
      searchResult: [],
      isLoading: false,
      timer: null,
      keywordsHistory: mpvue.getStorageSync('keyword') || []
    }
  },
  methods: {
    //   清空历史记录
    clearHistory () {
      // 清空本地存储的数据和data中的数据  两者并不会互相影响
      mpvue.clearStorage()
      this.keywordsHistory = []
    },
    // 完成关键字的本地存储
    confirmHandle () {
    //   回车时记录关键字到本地存储
      this.keywordsHistory.unshift(this.keywords)
      //   把最新数据覆盖到本地存储中
      mpvue.setStorageSync('keyword', this.keywordsHistory)
      console.log(mpvue.getStorageSync('keyword'))
    },
    // 点取消按钮清空关键字
    cancelHandle () {
      this.keywords = ''
    },
    // 根据输入关键字查询匹配得数据
    async inputHandle () {
    // 控制请求得频率  输入多个字符但是只发送一个请求
    //   控制是否发送请求
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      this.timer = setTimeout(async () => {
        clearTimeout(this.timer)
        let res = await request('goods/qsearch', 'get', {
          query: this.keywords
        })
        const {message} = res.data
        this.searchResult = message
        //   重新打开开关
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
    @import "main.scss"
</style>
