<template>
  <div id="BusinessOverview" class="app-container">
    <div class="filter-container">
      <el-select v-model="overviewType">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="currentDate"
        :type="overviewType"
        :placeholder="overviewType | dateType"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleExport"
      >导出Excel</el-button>
    </div>
    <el-table
      v-loading="loading"
      border
      style="width: 100%"
      :data="tableData"
      :height="tableHeight"
    >
      <el-table-column prop="name" label="业务名称" />
      <el-table-column prop="founders" label="创建人" />
      <el-table-column prop="create_time" label="创建时间" />
      <el-table-column prop="success" label="成功量" />
      <el-table-column prop="total" label="总量" />
    </el-table>
    <el-pagination
      class="pagination-container"
      layout="sizes, prev, pager, next"
      background
      :total="pageTotal"
      :current-page.sync="listQuery.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getBusinessOverview } from '@/api/business_overview'

export default {
  name: 'BusinessOverview',
  components: { },
  filters: {
    dateType(val) {
      return `选择${val === 'year' ? '年' : val === 'month' ? '月' : '天'}`
    }
  },
  props: {},
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0, // 总条数
      loading: false,
      tableData: [],
      overviewType: 'month',
      currentDate: '',
      options: [
        {
          value: 'year',
          label: '按年查'
        },
        {
          value: 'month',
          label: '按月查'
        },
        {
          value: 'date',
          label: '按天查'
        }
      ]
    }
  },
  computed: {
    tableHeight() {
      return this.$store.getters.tableHeight
    }
  },
  created() {
    this.getList()
  },
  beforeMount() {},
  mounted() {

  },
  methods: {
    async getList() {
      this.loading = true
      const { total, data } = await getBusinessOverview(this.listQuery)
      this.pageTotal = total
      this.tableData = [...data]
      this.loading = false
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.getList()
    },
    // 查询
    handleFilter() {

    },
    // 导出Excel
    handleExport() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
