<template>
  <div id="BusinessGroup" class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-plus"
        @click="handleAdd"
      >添加组员</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-delete"
        @click="handleRemove"
      >移除组员</el-button>
    </div>
    <el-table
      v-loading="loading"
      border
      style="width: 100%"
      :data="tableData"
      :height="tableHeight"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="36" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="gender" label="性别" width="60" :formatter="formatterGender" />
      <el-table-column prop="mail" label="邮箱" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="level" label="等级" width="60" />
      <el-table-column prop="job_number_id" label="移动工号" />
      <el-table-column prop="job_number_sim" label="SIM" />
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
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
import { getUsers } from '@/api/user'

export default {
  name: 'BusinessGroup',
  components: { },
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
      multipleSelection: [],
      handleCreate: false,
      fileList: []
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
      this.loading = true
      const { total, data } = await getUsers(this.listQuery)
      this.pageTotal = total
      this.tableData = [...data]
      this.loading = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.getList()
    },
    formatterGender(row, column, cellValue, index) {
      return cellValue ? '男' : '女'
    },
    handleAdd() {

    },
    handleEdit(row) {},
    handleRemove() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
