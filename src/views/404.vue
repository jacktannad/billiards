<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "page-404"
})
</script>

<template>
  <div>
    <h2>page-404</h2>
    <el-button type="primary" round @click="$router.back()">返回</el-button>
  </div>
</template>

<style scoped lang="scss">

</style>