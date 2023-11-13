<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "LibAsideMenuItem",
  props: {
    collapseMenu: {
      type: Boolean,
      default: false
    },
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
  }
})
</script>

<template>
  <div>
    <template v-if="collapseMenu && route.children && route.children.length === 1">
      <LibMenuItem :index="`${index}/${route.children[0].path}`"
                   :route="route.children[0]"/>
    </template>
    <template v-else>
      <LibMenuItem v-if="!route.children || !route.children.length" :index="index" :route="route"/>
      <LibSubMenu v-else :index="index" :route="route"/>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>