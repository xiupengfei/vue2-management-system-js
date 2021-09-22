export default {
  methods: {
    reset() {
      // 表格数据量变动时重置
      this.listQuery.pageIndex = 1
      this.$refs.table.clearSelection()
    }
  }
}
