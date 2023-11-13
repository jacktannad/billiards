<script>
import {defineComponent} from "vue";

import {layouts} from "@/config/layout.config"
import {mapGetters} from "vuex";

export default defineComponent({
  name: "LibSetupDrawer",
  data() {
    return {
      drawer: false,
      title: "系统设置",
      size: "360px",
      layouts,
      layout_value: ''
    }
  },
  computed: {
    ...mapGetters(["layout"]),
  },
  methods: {
    handleOpen() {
      this.drawer = true
      this.layout_value = this.layout
    },
    changeLayout(value) {
      this.$store.dispatch("setLayout", value)
    }
  }
})
</script>

<template>
  <el-drawer
      :title="title"
      :visible.sync="drawer"
      :size="size"
      direction="rtl"
      :modal="false"
      modal-append-to-body>
    <div class="setup-suspension-icon">

      <div class="row">
        <div class="label"><span class="text">布局</span><i class="el-icon-menu"></i></div>
        <div class="label">
          <el-select @change="changeLayout" size="small" v-model="layout_value" placeholder="请选择布局">
            <el-option
                v-for="item in layouts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

    </div>
  </el-drawer>
</template>

<style lang="scss">
.setup-suspension-icon {
  padding: 0 20px;
  user-select: none;

  .row {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 20px;

    .text {
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>