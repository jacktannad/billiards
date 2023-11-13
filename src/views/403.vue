<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "page-403"
})
</script>

<template>
  <div class="page-403">
    <h2>没有权限访问</h2>
    <el-button type="primary" round @click="$router.back()">返回</el-button>
  </div>
</template>

<style scoped lang="scss">

</style>