<script>
import {defineComponent} from "vue";
import {mapGetters} from "vuex";

export default defineComponent({
  name: "LibCollapseIcon",
  computed: {
    ...mapGetters(['isCollapse'])
  },
  methods: {
    tagCollapse() {
      this.$store.dispatch("tagCollapse")
    }
  }
})
</script>

<template>
  <div class="tag-collapse-icon" @click="tagCollapse">
    <i :class="!isCollapse ?'el-icon-s-fold' :'el-icon-s-unfold' "></i>
  </div>
</template>

<style scoped lang="scss">
.tag-collapse-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;

  &:hover {
    cursor: pointer;

    i::before {
      color: greenyellow;
    }
  }

  i::before {
    font-size: 20px;
    color: #FFFFFF;
  }
}
</style>