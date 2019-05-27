<template>
  <div id="CreateDialog">
    <el-dialog title="创建" :visible.sync="dialogVisible">
      <el-form ref="ruleForm" label-position="right" :model="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="业务组名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="业务组名称" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="任命小组组长" prop="leader">
          <el-select v-model="form.leader" placeholder="请选择小组组长名字" style="width: 400px;">
            <el-option v-for="(leader, idx) in leaders" :key="idx" :label="leader.username" :value="leader.user_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" type="textarea" placeholder="描述" autocomplete="off" style="width: 400px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button v-if="!loading" type="primary" @click="submit">创建</el-button>
        <el-button v-if="loading" type="primary" :loading="loading">加载中...</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dialogMixin from '@/mixin/dialog'
export default {
  name: 'CreateDialog',
  components: {},
  mixins: [dialogMixin],
  props: {
    leaders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        leader: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入业务组名称', trigger: ['blur'] }
        ]
      }
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
