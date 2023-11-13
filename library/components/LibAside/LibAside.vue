<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "LibAside",
  props: {
    collapseMenu: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: "vertical"
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    },
    menu: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    setIndex(route = {}) {
      if (this.basePath) return `${this.basePath}/${route.path}`;
      return route.path;
    }
  }
})
</script>

<template>
  <div class="aside">
    <el-menu
        :mode="mode"
        :default-active="$route.fullPath"
        :router="true"
        class="el-menu-demo"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <LibAsideMenuItem :collapseMenu="collapseMenu" :route="route" v-for="(route,index) in menu" :key="index" :index="setIndex(route)"/>
    </el-menu>
  </div>
</template>
