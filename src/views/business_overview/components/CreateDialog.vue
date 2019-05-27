<template>
  <div id="CreateBusinessGroupDialog">
    <el-dialog title="创建" :visible.sync="dialogVisible">
      <el-form ref="ruleForm" label-position="right" :model="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="业务组名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button v-if="!loading" type="primary" @click="submit">创建</el-button>
        <el-button v-if="loading" type="primary" :loading="loading" @click="submit">加载中...</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dialogMixin from '@/mixin/dialog'
export default {
  name: 'CreateBusinessGroupDialog',
  components: {},
  mixins: [dialogMixin],
  data() {
    return {
      dialogVisible: false,
      loading: false,
      formLabelWidth: '120px',
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入业务组名称', trigger: ['blur'] },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: ['blur'] }
        ]
      }
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
