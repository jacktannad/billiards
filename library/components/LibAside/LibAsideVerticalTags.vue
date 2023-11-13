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
    /**
     * @description 判断当前路径是否激活
     * @param path
     * @return {boolean}
     */
    setActiveRoot(path) {
      const root = this.$route.fullPath.split("/")[1]
      return `/${root}` === path
    },
    /**
     * 点击路由跳转
     * @param route
     */
    handleRouter(route) {
      // 跳转的路径是当前路由不操作
      if (this.$route.fullPath === route.redirect) return;
      this.$router.push(route.redirect)
    }
  }
})
</script>

<template>
  <div class="aside">
    <div class="menus" @click="handleRouter(route)" :class="{ active : setActiveRoot(route.path) }"
         v-for="( route , index ) in menu" :key="index">
      <div class="menus-con">
        <div class="menu-icon">
          <img :src=" setActiveRoot(route.path) && route.meta.icon_on ? route.meta.icon_on : route.meta.icon">
          <img class="icon_on" :src="route.meta.icon_on">
        </div>
        <div class="title">{{ route.meta.title }}</div>
      </div>
    </div>
  </div>
</template>
