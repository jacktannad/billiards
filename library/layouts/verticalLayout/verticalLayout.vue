<script>
import {defineComponent} from "vue";
import {mapGetters} from "vuex";
import {comTitle} from "@/config/system.config";
import comLogo from "@/assets/logo.png"

export default defineComponent({
  name: "verticalLayout",
  data() {
    return {
      comLogo,
      comTitle
    }
  },
  computed: {
    ...mapGetters(['menus', 'isCollapse']),
  },
  methods: {
    goHome() {
      this.$router.push("/")
    },
  }
})
</script>

<template>
  <div class="comprehensive-layout">
    <aside :class="{'collapse-aside': isCollapse }">
      <LibLogoTitle @goHome="goHome"/>
      <LibAside :collapseMenu="true" :isCollapse="isCollapse" :menu="menus"></LibAside>
    </aside>
    <main>
      <header>
        <div class="left-nav">
          <LibCollapseIcon/>
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
@import "verticalLayout";
</style>
