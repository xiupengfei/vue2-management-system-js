<template>
  <div id="Role" class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="角色查询"
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
    </div>
    <el-table
      v-loading="loading"
      border
      style="width: 100%"
      :data="tableData"
      :height="tableHeight"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="36"
      />
      <el-table-column
        prop="roles"
        label="角色名称"
        width="120"
      />
      <el-table-column
        prop="desc"
        label="描述"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="50"
      >
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
    <create-dialog ref="createDialog" @cb="handelCreateCB" />
    <edit-dialog ref="editDialog" @cb="handelEditCB" />
  </div>
</template>

<script>
import { getRoles } from '@/api/role'
// import permission from '@/directive/permission'
import CreateDialog from './components/CreateDialog'
import EditDialog from './components/EditDialog'

export default {
  name: 'Role',
  // directives: { permission },
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
      const { total, data } = await getRoles(this.listQuery)
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
    // 创建组
    handleCreate() {
      this.$refs.createDialog.show()
    },
    // 创建组回掉
    handelCreateCB(data) {
      this.tableData.unshift({ ...data, founders: 'admin' })
      this.$refs.createDialog.hide()
    },
    // 编辑组
    handleEdit(row) {
      this.$refs.editDialog.show(row)
    },
    // 编辑组回掉
    handelEditCB(data) {
      this.$refs.editDialog.hide()
    },
    // 删除组
    handleDelete() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
