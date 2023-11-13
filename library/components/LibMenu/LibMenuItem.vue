<template>
  <div>
    <el-menu-item v-if="show" :index="index">
      <i class="el-icon-setting"></i>
      <span slot="title">{{ route.meta.title }}</span>
    </el-menu-item>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "LibMenuItem",
  props: {
    index: {
      type: String,
      default: ""
    },
    route: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data(){
    return {
      show:true
    }
  },
  watch:{
    $route:function (){
      this.show = false
      this.$forceUpdate()
      this.$nextTick(()=> this.show = true)
    }
  },
})
</script>

<style scoped lang="scss">

</style>