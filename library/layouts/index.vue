<template>
  <div>
    <component :is="layouts[layout]"></component>
    <LibSetupSuspensionIcon v-if="setupIcon" @change="handelOpenLibSetupDrawer"/>
    <LibSetupDrawer ref="libSetupDrawer"></LibSetupDrawer>
  </div>
</template>

<script>

import columnsLayout from "./generalLayout/generalLayout.vue";
import comprehensiveLayout from "./comprehensiveLayout/comprehensiveLayout.vue";
import verticalLayout from "./verticalLayout/verticalLayout.vue";
import horizontalLayout from "./horizontalLayout/horizontalLayout.vue";
import verticalTagsLayout from "./verticalTagsLayout/verticalTagsLayout.vue";

import {mapGetters} from "vuex";


export default {
  name: 'LayoutIndex',
  data() {
    return {
      layouts: {
        general: columnsLayout,
        comprehensive: comprehensiveLayout,
        vertical: verticalLayout,
        horizontal: horizontalLayout,
        verticalTags: verticalTagsLayout,
      },
    };
  },
  computed: {
    ...mapGetters(["layout",'setupIcon']),
  },
  methods: {
    handelOpenLibSetupDrawer() {
      this.$refs.libSetupDrawer.handleOpen();
    }
  }
}
</script>

<style scoped lang="scss">
@import "/library/styles/layout";
</style>
