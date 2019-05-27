<template>
  <div id="User" class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-permission="['user:query']"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        v-permission="['user:create']"
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >创建</el-button>
      <el-button
        v-permission="['user:delete']"
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-delete"
        @click="handleDelete"
      >删除</el-button>
      <el-button
        v-permission="['user:create']"
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-upload2"
        @click="handleUpload"
      >上传</el-button>
      <!-- <upload-excel-component :on-success="handleSuccess" /> -->
    </div>
    <el-table
      v-loading="loading"
      border
      style="width: 100%"
      :data="tableData"
      :height="tableHeight"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="gender" label="性别" width="60" :formatter="formatterGender" />
      <el-table-column prop="birth" label="生日" width="120" />
      <el-table-column prop="entry_time" label="入职时间" />
      <el-table-column prop="mail" label="邮箱" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="level" label="等级" width="60" />
      <el-table-column prop="salary" label="工资" width="80" />
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button v-permission="['user:update']" type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-container"
      layout="sizes, prev, pager, next"
      background
      :total="listQuery.total"
      :current-page.sync="listQuery.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <create-dialog ref="createDialog" @cb="handelCreateCB" />
    <edit-dialog ref="editDialog" @cb="handelEditCB" />
  </div>
</template>

<script>
import { getUsers } from '@/api/user'
import permission from '@/directive/permission'
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import CreateDialog from './components/CreateDialog'
import EditDialog from './components/EditDialog'

export default {
  name: 'User',
  directives: { permission },
  components: { CreateDialog, EditDialog },
  props: {},
  data() {
    return {
      listQuery: {
        name: '',
        total: 0,
        currentPage: 1
      },
      formLabelWidth: '120px',
      loading: false,
      tableData: [],
      multipleSelection: [],
      fileList: [],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
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
      const { total, data } = await getUsers()
      this.listQuery.total = total
      this.tableData = [...data]
      this.loading = false
    },
    handleUpload() {
      this.$alert('alert', {
        confirmButtonText: '确定'
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.getList()
    },
    handleCurrentChange(val) {
      this.getList()
    },
    formatterGender(row, column, cellValue, index) {
      return cellValue ? '男' : '女'
    },
    handleFilter() {

    },
    handleDelete() {},
    handleSuccess({ results, header }) {
      // console.log(results, header)
    },
    // 创建业务组
    handleCreate() {
      this.$refs.createDialog.show()
    },
    // 创建业务组回掉
    handelCreateCB(data) {
      this.$refs.createDialog.hide()
    },
    // 编辑业务组
    handleEdit(row) {
      this.$refs.editDialog.show(row)
    },
    handelEditCB(data) {
      this.$refs.editDialog.hide()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
