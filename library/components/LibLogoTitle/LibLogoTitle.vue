<script>
import {defineComponent} from "vue";
import {comTitle} from "@/config/system.config";

import comLogo from "@/assets/logo.png"

export default defineComponent({
  name: "LibLogoTitle",
  data() {
    return {
      comLogo,
      comTitle
    }
  },
  methods: {
    goHome() {
      this.$emit("goHome")
      this.$router.push("/")
    }
  }
})
</script>

<template>
  <div class="www-com" @click.stop="goHome">
<!--    <img class="logo" alt="logo" :src="comLogo">-->
    <div class="name">{{ comTitle }}</div>
  </div>
</template>

<style scoped lang="scss">
.www-com {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  margin: 0 15px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    .name {
      color: greenyellow;
    }
  }

  .logo {
    width: calc($headerHeight - $headerBorderBottomHeight - 10px);
    height: calc($headerHeight - $headerBorderBottomHeight - 10px);
  }

  .name {
    margin-left: 10px;
    user-select: none;
    color: #FFFFFF;
  }
}
</style>
