<template>
  <div
    class="custom-table"
    :class="{
      'has-pagination': showPagination,
      'fixed-pagination': fixedPagination
    }"
    :style="{ height: height }"
  >
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      :row-key="getRowKey"
      v-bind="$attrs"
      :height="showPagination ? 'calc(100% - 38px)' : '100%'"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        v-if="$scopedSlots.expand || expand"
        label="#"
        type="expand"
      >
        <template #default="{row}">
          <slot name="expand" :row="row" />
        </template>
      </el-table-column>
      <slot />
      <el-table-column
        v-if="$scopedSlots.action || action"
        :label="actionLabel"
      >
        <template #default="{row}">
          <slot name="action" :row="row" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-if="showPagination"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="$emit('pagination')"
    />
  </div>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    total: {
      type: Number,
      default: 0
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    action: {
      type: Boolean,
      default: false
    },
    fixedPagination: {
      type: Boolean,
      default: false
    },
    maxSelection: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: null
    },
    actionLabel: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      timer: null
    }
  },

  computed: {
    page: {
      get() {
        return this.pageIndex
      },
      set(val) {
        this.$emit('update:page-index', val)
      }
    },
    limit: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:page-size', val)
      }
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    clearSelection() {
      if (this.$refs.table) {
        this.$refs.table.clearSelection()
      }
    },
    toggleRowSelection(rows) {
      rows.forEach(item => {
        this.$refs.table.toggleRowSelection(item)
      })
    },
    getRowKey(row) {
      return row.id
    },
    handleSelectionChange(rows) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('selection-change', rows)
      }, 100)
    },
    handleSortChange(v) {
      this.$emit('sort-change', v)
    },
    handleSelect(rows) {
      if (this.maxSelection > 0) {
        rows.splice(this.maxSelection)
        this.clearSelection()
        this.toggleRowSelection(rows)
      }
      this.$emit('select', rows)
    },
    handleSelectAll(rows) {
      if (this.maxSelection > 0) {
        rows.splice(this.maxSelection)
        this.clearSelection()
        this.toggleRowSelection(rows)
      }
      this.$emit('select-all', rows)
    },
    setRowSelection(rows) {
      this.clearSelection()
      setTimeout(() => {
        this.toggleRowSelection(rows)
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-table {
  &.has-pagination.fixed-pagination {
    ::v-deep .el-table {
      padding-bottom: 38px;
    }
  }
  &.fixed-pagination {
    ::v-deep .el-pagination {
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: white;
      width: calc(100% - 17px);
      z-index: 2;
    }
  }
}
</style>
