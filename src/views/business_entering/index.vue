<template>
  <div id="BusinessEntering" class="app-container">
    <div class="main-left">
      <el-card class="business-info">
        <div slot="header" class="clearfix">
          <span>当前业务</span>
        </div>
        <el-popover
          placement="right-start"
          :title="businessInfo.name"
          width="240"
          trigger="hover"
        >
          <div class="business-info-item">
            <span>业务名称: </span>
            <span>{{ businessInfo.name }}</span>
          </div>
          <div class="business-info-item">
            <span>创建人： </span>
            <span>{{ businessInfo.founders }}</span>
          </div>
          <div class="business-info-item">
            <span>创建时间： </span>
            <span>{{ businessInfo.create_time }}</span>
          </div>
          <div class="business-info-item">
            <span>业务状态： </span>
            <span>{{ businessInfo.state }}</span>
          </div>
          <span slot="reference" class="pointer not-select">{{ businessInfo.name }}</span>
        </el-popover>
      </el-card>
      <el-card class="business-ranking">
        <div slot="header" class="clearfix">
          <span>业务排名</span>
          <el-button style="float: right; padding: 2px 0" type="text">>>></el-button>
        </div>
        <div class="business-ranking-type">
          <el-radio v-model="rankingType" class="ranking-type-radio" label="year">年</el-radio>
          <el-radio v-model="rankingType" class="ranking-type-radio" label="month">月</el-radio>
          <el-radio v-model="rankingType" class="ranking-type-radio" label="date">日</el-radio>
        </div>
        <div class="business-ranking-list">
          <transition-group name="flip-list" tag="ul">
            <li v-for="item in rankingList" :key="item">
              {{ item }}
            </li>
          </transition-group>
        </div>
      </el-card>
    </div>
    <div class="main-right">
      <div class="filter-container">
        <el-input
          v-model="listQuery.name"
          placeholder="名称"
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
        >开始录入</el-button>
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
        <el-table-column v-for="(item, idx) in businessInfo.fields" :key="idx" :prop="item.name" :label="item.name" />
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
  </div>
</template>

<script>
import { getBusinessDetail } from '@/api/business'
import { getBusinesses } from '@/api/business_entering'

export default {
  name: 'BusinessEntering',
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
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0, // 总条数
      loading: false,
      tableData: [],
      rankingType: 'date', // 排名类型(默认按照[天]排名)
      rankingList: [2, 1, 5, 8, 9, 10, 3, 4],
      businessInfo: {
        name: '',
        create_time: '',
        founders: '',
        state: '',
        desc: '',
        fields: []
      }
    }
  },
  computed: {
    tableHeight() {
      return this.$store.getters.tableHeight
    }
  },
  created() {
    this.getBusiness()
    // this.getList()
  },
  beforeMount() {},
  mounted() {},
  methods: {
    async getList() {
      this.loading = true
      const { total, data } = await getBusinesses(this.listQuery)
      this.pageTotal = total
      this.tableData = [...data]
      this.loading = false
    },
    async getBusiness(id = 1) {
      const { data } = await getBusinessDetail(id)
      this.businessInfo = data
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
      // this.rankingList.sort((a , b) => {
      //   return a - b
      // })
    },
    // 录入数据
    handleCreate() {

    },
    // 导出Excel
    handleExport() {

    }
  }
}
</script>

<style lang="scss" scoped>
#BusinessEntering {
  display: flex;
  .main-left {
    width: 140px;
    margin-right: 10px;
    .ranking-type-radio:not(:last-child) {
      margin-right: 4px;
    }
    .business-ranking-type{
      border-bottom: 1px solid #1890FF;
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
  }
  .main-right {
    flex: 1;
  }
}
</style>

<style lang="scss">
#BusinessEntering {
  .el-card__header {
    padding: 18px 16px;
    font-size: 18px;
  }
  .el-card__body {
    padding: 10px;
  }
  .el-radio__label{
    padding-left: 5px;
  }
  .flip-list-move {
    transition: transform 1s;
  }
}
</style>
