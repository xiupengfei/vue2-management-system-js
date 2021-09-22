<template>
  <div id="UploadFile">
    <el-dialog title="批量导入" :visible.sync="dialogVisible" :close-on-click-modal="false" @close="hide">
      <el-upload
        ref="upload"
        drag
        action="customize"
        style="text-align: center;"
        accept=".xlsx,.xls"
        :auto-upload="false"
        :file-list="fileList"
        :on-exceed="fileExceed"
        :on-change="handleChange"
        :http-request="uploadFile"
        :on-success="onSuccess"
        :on-error="onError"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传xlsx / xls文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <span v-if="template.name" class="template-download pointer not-select" @click="downloadTemplate">
          <i class="el-icon-download" />格式模板下载：{{ template.name }}
        </span>
        <el-button @click="hide">取 消</el-button>
        <el-button v-if="!loading" type="primary" @click="submit">上传</el-button>
        <el-button v-if="loading" type="primary" :loading="loading">加载中...</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { uploadFile, downloadFile } from '@/api'
import { typeOf, DownloadFile } from '@/utils'

export default {
  name: 'UploadFile',
  components: {},
  props: {
    action: {
      type: String,
      required: true
    },
    template: {
      type: Object,
      default: () => {
        return {
          name: '',
          url: '',
          data: {}
        }
      }
    },
    limitSize: {
      type: Number,
      required: false,
      default: -1 // 单位KB
    }
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      fileList: [],
      extraData: {}
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    hide() {
      this.dialogVisible = false
      this.$refs.upload.clearFiles()
    },
    show(extradata) {
      this.dialogVisible = true
      if (typeOf(extradata) === 'object') {
        this.extraData = extradata
      }
    },
    submit() {
      if (this.fileList.length === 0) {
        this.$alert('请选择要上传的文件', '提示:', {
          confirmButtonText: '确定',
          showClose: false,
          type: 'warning'
        })
        return
      }
      this.$refs.upload.submit()
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1)
    },
    uploadFile(upload) {
      const _file = upload.file
      // 检查文件大小限制
      if (this.limitSize > 0) {
        const isLtLimitSize = _file.size / 1024 < this.limitSize
        if (!isLtLimitSize) {
          this.$message.error(`请上传${this.limitSize}KB以下的文件`)
          return false
        }
      }

      // 通过 FormData 对象上传文件
      var formData = new FormData()
      formData.append('file', _file)
      Object.entries(this.extraData).map(([k, v]) => {
        formData.append(k, v)
      })
      // 发起请求
      uploadFile(this.action, formData, {
        onUploadProgress(event) {
          event.percent = event.loaded / event.total * 100
          upload.onProgress(event)
        }
      }).then((res) => {
        upload.onSuccess(res)
      }, (err) => {
        upload.onError(err)
      })
    },
    onSuccess(res) {
      this.$emit('on-success', res)
    },
    onError(err) {
      this.$emit('on-error', err)
    },
    fileExceed(f, list) {
      console.log(f, list)
    },
    downloadTemplate() {
      downloadFile(this.template.url, this.template.data).then(res => {
        DownloadFile(res, this.template.name)
      })
    }
  }
}
</script>

<style lang="scss">
#UploadFile {
  .el-upload-list, .el-upload__tip {
    text-align: left;
  }
  .template-download{
    float: left;
    font-size: 14px;
    color: rgb(96, 98, 102);
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
