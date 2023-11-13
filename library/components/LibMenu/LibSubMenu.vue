<template>
  <div>
    <el-submenu :index="index" popper-append-to-body>
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ route.meta.title }}</span>
      </template>
      <LibAsideMenuItem :route="route_" v-for="(route_,index_) in route.children"
                        :key="index_" :index="`${index}/${route_.path}`"></LibAsideMenuItem>
    </el-submenu>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "LibSubMenu",
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
  data() {
    return {
      show: true
    }
  },
  watch: {
    $route: function () {
      this.show = false
      this.$forceUpdate()
      this.$nextTick(() => this.show = true)
    }
  }
})
</script>

<style scoped lang="scss">

</style>