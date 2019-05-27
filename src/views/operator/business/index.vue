<template>
  <div id="Business" class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="业务名"
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
      <el-table-column type="selection" width="36" />
      <el-table-column type="expand" label="#">
        <template v-if="props.row.fields" slot-scope="props">
          <h3>业务<el-tag style="margin:0 5px;">{{ props.row.name }}</el-tag>字段：</h3>
          <span v-for="(field, idx) in props.row.fields" :key="idx">{{ field.name }} 、</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="业务名称" width="100" />
      <el-table-column prop="founders" label="创建人" width="100" />
      <el-table-column prop="create_time" label="创建时间" width="100" />
      <el-table-column prop="groups" label="分配小组" width="240">
        <template slot-scope="scope">
          <el-tag v-for="(group, idx) in scope.row.groups" :key="idx" size="small" style="margin:2px;">{{ group.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="80" />
      <el-table-column prop="desc" label="描述" />
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
      :total="listQuery.total"
      :current-page.sync="listQuery.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <create-dialog ref="createDialog" :states="states" @cb="handelCreateCB" />
    <edit-dialog ref="editDialog" :states="states" @cb="handelCreateCB" />
  </div>
</template>

<script>
import { getBusinesses } from '@/api/business'
import CreateDialog from './components/CreateDialog'
import EditDialog from './components/EditDialog'

export default {
  name: 'Businesses',
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
      states: ['运行中', '暂停', '停止'],
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
      const { total, data } = await getBusinesses(this.listQuery)
      this.listQuery.total = total
      this.tableData = [...data]
      this.loading = false
    },
    // 多选
    handleSelectionChange(val) {
      this.listQuery.pageSize = val
      this.multipleSelection = val
    },
    // 每页显示条数变化触发
    handleSizeChange(val) {
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

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
