<template>
    <div>
        <div class="search">
            <div class="search-content">
                <div class="search-input">
                    <icon type="search" size="16"/>
                    <input v-model='keywords' placeholder="请输入关键字">
                </div>
                <button v-if='keywords' class="cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      keywords: ''
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "main.scss"
</style>
