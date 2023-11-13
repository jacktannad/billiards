<template>

  <div class="pagination-index">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="sizes"
        :page-size="limit"
        :layout="layout"
        :total="total">
    </el-pagination>
  </div>

</template>

<script>
export default {
  name: "PaginationIndex",
  props: {
    current: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    sizes: {
      type: Array,
      default: () => [15, 30, 60, 100]
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("change", val, 0)
    },
    handleCurrentChange(val) {
      this.$emit("change", this.limit, val)
    }
  }
}
</script>
<style lang="scss">
.pagination-index{
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>
