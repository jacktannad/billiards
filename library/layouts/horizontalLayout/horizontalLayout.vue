<template>
  <div class="horizontal-layout">
    <header>
      <div class="left-nav">
        <LibLogoTitle @goHome="goHome"/>
        <LibAside :collapseMenu="true" mode="horizontal" :menu="menus"></LibAside>
      </div>
      <div class="right-avatar">
        <lib-avatar></lib-avatar>
      </div>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>

import {mapGetters} from "vuex"
import { comTitle} from "@/config/system.config"
import comLogo from "@/assets/logo.png"

export default {
  name: "horizontalLayout",
  data() {
    return {
      comLogo,
      comTitle
    }
  },
  computed: {
    ...mapGetters(['menus'])
  },
  methods: {
    goHome() {
      this.$router.push("/")
    },

  }
}
</script>

<style lang="scss">
@import "horizontalLayout";
</style>
