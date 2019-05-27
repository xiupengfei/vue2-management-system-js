<template>
  <div id="EditDialog">
    <el-dialog title="修改业务" :visible.sync="dialogVisible" width="1000px">
      <div class="form-wrapper">
        <el-form ref="ruleForm" class="form-left" label-position="right" :model="form" :rules="rules" :label-width="formLabelWidth">
          <el-form-item label="业务名称" prop="name">
            <el-input v-model="form.name" autocomplete="off" placeholder="业务组名称" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="form.state" placeholder="请选择业务状态" style="width: 200px;">
              <el-option v-for="(state, idx) in states" :key="idx" :label="state" :value="state" />
            </el-select>
          </el-form-item>
          <el-form-item label="业务字段" prop="field">
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag"
              closable
              size="mini"
              style="margin-right: 5px;"
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="form.desc" type="textarea" rows="3" placeholder="业务描述" autocomplete="off" style="width: 200px;" />
          </el-form-item>
        </el-form>
        <div class="form-right">
          <el-form>
            <el-form-item label="业务分配" prop="distribut">
              <el-transfer v-model="form.selgroups" :titles="['所有小组', '已分配组']" :data="groups" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button v-if="!loading" type="primary" @click="submit">修改</el-button>
        <el-button v-if="loading" type="primary" :loading="loading">加载中...</el-button>
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
    states: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      formLabelWidth: '120px',
      inputVisible: false,
      inputValue: '',
      dynamicTags: ['字段1', '字段2', '字段3'],
      form: {
        name: '',
        leader: '',
        desc: '',
        state: '',
        selgroups: [],
        customFields: []
      },
      groups: [{
        key: '001',
        label: '业务组1'
      },
      {
        key: '002',
        label: '业务组2'
      },
      {
        key: '003',
        label: '业务组3'
      }],
      rules: {
        name: [
          { required: true, message: '请输入业务组名称', trigger: ['blur'] }
        ]
      }
    }
  },
  watch: {
    dynamicTags(n) {
      this.form.customFields = n
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      if (this.inputValue.trim()) {
        this.dynamicTags.push(this.inputValue.trim())
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper{
  display: flex;
  flex-wrap: wrap;
  .form-left{
    width: 320px;
    margin-right: 20px;
  }
  .form-right{
    flex: 1;
    height: inherit;
  }
}
</style>
