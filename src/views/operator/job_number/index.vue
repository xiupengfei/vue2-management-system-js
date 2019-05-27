<template>
  <div id="JobNumber" class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="工号"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >创建</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-delete"
        @click="handleDelete"
      >删除</el-button>
      <!-- <upload-excel-component :on-success="handleImportSuccess" /> -->
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
      <el-table-column type="expand" label="#">
        <template v-if="props.row.users" slot-scope="props">
          <h3>使用工号{{ props.row.id }} 员工姓名如下：</h3>
          <span v-for="(user, idx) in props.row.users" :key="idx">{{ user.name }} 、</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="工号ID" width="100" />
      <el-table-column prop="sim" label="SIM" width="180" />
      <el-table-column prop="state" label="状态" width="80" />
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button v-permission="['business_group:update']" type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-container"
      layout="sizes, prev, pager, next"
      background
      :total="listQuery.total"
      :current-page.sync="listQuery.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <create-dialog ref="createDialog" @cb="handelCreateCB" />
    <edit-dialog ref="editDialog" @cb="handelCreateCB" />
  </div>
</template>

<script>
import permission from '@/directive/permission'
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { getJobNumbers } from '@/api/job_number'
import CreateDialog from './components/CreateDialog'
import EditDialog from './components/EditDialog'

export default {
  name: 'JobNumber',
  directives: { permission },
  components: { CreateDialog, EditDialog },
  props: {},
  data() {
    return {
      listQuery: {
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0, // 总条数
      loading: false,
      tableData: [],
      multipleSelection: []
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
  mounted() {},
  methods: {
    async getList() {
      this.loading = true
      const { total, data } = await getJobNumbers(this.listQuery)
      this.pageTotal = total
      this.tableData = [...data]
      this.loading = false
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 每页显示条数变化触发
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    // 当前页面变化触发
    handleCurrentChange(val) {
      this.getList()
    },
    // 搜索
    handleFilter() {
      // getBusinessGroups()
    },
    // 创建业务组
    handleCreate() {
      this.$refs.createDialog.show()
    },
    // 创建业务组回掉
    handelCreateCB() {

    },
    // 编辑业务组
    handleEdit(row) {
      this.$refs.editDialog.show(row)
    },
    // 编辑业务组回掉
    handelEditCB() {

    },
    // 删除业务组
    handleDelete() {

    },
    // 导入文件成功回调
    handleImportSuccess({ results, header }) {
      console.log({ results, header })
      this.tableData = [...results]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
