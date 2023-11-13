<script>
import {defineComponent} from "vue";
import {mapGetters} from "vuex";
import { comTitle} from "@/config/system.config";
import comLogo from "@/assets/logo.png"

export default defineComponent({
  name: "comprehensiveLayout",
  data() {
    return {
      columns_active: "",
      columnsRoutes: {},
      comLogo,
      comTitle
    }
  },
  computed: {
    ...mapGetters(["routes", 'token', 'menus', 'isCollapse']),
    header_active: function () {
      return "/" + this.$route.fullPath.split("/")[1]
    },
  },
  mounted() {
    this.initAsides();
  },
  methods: {
    goHome() {
      this.$router.push("/").then(() => {
        this.initAsides();
      })
    },
    initAsides() {
      this.handleHeaderRoute(this.header_active);
    },
    handleHeaderRoute(index) {
      const filters = this.menus.filter(route => route.path === index);
      if (!filters.length) return;
      this.columnsRoutes = filters[0]
      this.$router.push(this.columnsRoutes.redirect)
    },
  }
})
</script>

<template>
  <div class="comprehensive-layout">
    <aside :class="{'collapse-aside': isCollapse }">
      <LibLogoTitle @goHome="goHome"/>
      <LibAside :isCollapse="isCollapse" :basePath="columnsRoutes.path" :menu="columnsRoutes.children"></LibAside>
    </aside>
    <main>
      <header>
        <div class="left-nav">

          <LibCollapseIcon/>
          <el-menu
              :default-active="header_active"
              class="el-menu-demo"
              mode="horizontal"
              background-color="#545c64"
              text-color="#fff"
              :router="false"
              active-text-color="#ffd04b"
              @select="handleHeaderRoute"
          >
            <el-menu-item :index="route.path" v-for="(route,index) in menus" :key="index">
              {{ route.meta.title }}
            </el-menu-item>
          </el-menu>
        </div>
        <div class="right-avatar">
          <lib-avatar></lib-avatar>
        </div>
      </header>
      <section class="app-main">
        <router-view/>
      </section>
    </main>
  </div>
</template>

<style lang="scss">
@import "comprehensiveLayout";
</style>
