<template>
  <div id="CreateDialog">
    <el-dialog title="创建" :visible.sync="dialogVisible">
      <el-form ref="ruleForm" label-position="right" :model="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="角色" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" prop="name">
          <el-input v-model="form.desc" autocomplete="off" />
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
  name: 'CreateDialog',
  components: {},
  mixins: [dialogMixin],
  data() {
    return {
      dialogVisible: false,
      loading: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: ['blur'] }
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
