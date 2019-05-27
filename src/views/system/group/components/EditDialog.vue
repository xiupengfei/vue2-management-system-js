<template>
  <div id="EditDialog">
    <el-dialog title="编辑" :visible.sync="dialogVisible">
      <el-form ref="ruleForm" label-position="right" :model="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="业务组名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="业务组名称" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" type="textarea" placeholder="描述" autocomplete="off" style="width: 400px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!loading" type="primary" @click="submit">修改</el-button>
        <el-button v-if="loading" type="primary" :loading="loading" @click="submit">加载中...</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dialogMixin from '@/mixin/dialog'
export default {
  name: 'EditDialog',
  components: {},
  mixins: [dialogMixin],
  props: {

  },
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入组名称', trigger: ['blur'] }
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
