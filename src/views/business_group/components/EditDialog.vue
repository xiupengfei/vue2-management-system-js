<template>
  <div id="EditBusinessGroupDialog">
    <el-dialog title="编辑" :visible.sync="dialogVisible">
      <el-form ref="ruleForm" label-position="right" :model="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="业务组名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!loading" type="primary" @click="submit">创建</el-button>
        <el-button v-if="loading" type="primary" :loading="loading" @click="submit">加载中...</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dialogMixin from '@/mixin/dialog'
export default {
  name: 'EditBusinessGroupDialog',
  components: {},
  mixins: [dialogMixin],
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '120px',
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入业务组名称', trigger: ['blur'] },
          { min: 1, max: 8, message: '长度在 3 到 8 个字符', trigger: ['blur'] }
        ]
      },
      loading: false
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
