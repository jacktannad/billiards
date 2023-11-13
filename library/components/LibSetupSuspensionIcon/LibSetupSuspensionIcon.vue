<script>

import {defineComponent} from "vue";

export default defineComponent({
  name: "LibSetupSuspensionIcon",
  data() {
    return {
      pageX: innerWidth - 80,
      pageY: innerHeight - 80
    }
  },
  methods: {
    handleChange() {
      this.$emit("change")
    },
    handleDrag(event) {
      if (!event.pageX && !event.pageY) return;
      this.pageX = event.pageX - 22
      this.pageY = event.pageY - 22
    }
  }
})
</script>

<template>
  <div class="setup-suspension-icon" draggable="true" :style="{left:`${pageX}px`,top:`${pageY}px`}"
       @drag="handleDrag" @click="handleChange">
    <i class="el-icon-s-tools"></i>
  </div>
</template>

<style scoped lang="scss">

@keyframes IconAnimate {
  to {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(360deg);
  }
}

.setup-suspension-icon {
  position: fixed;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%; /*将正方形变为圆形*/
  background: radial-gradient(closest-side circle, deepskyblue, deepskyblue, deepskyblue, white);


  i{
    animation: 4s IconAnimate infinite linear;
  }

  &:hover {
    cursor: pointer;
  }

  .el-icon-s-tools {
    font-size: 30px;
    color: #545c64;
  }
}
</style>