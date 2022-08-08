<template>
  <div>
    <el-dialog
      title="新增商品类型"
      :visible="visible"
      width="55%"
    >
      <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        label-width="130px"
      >
        <el-form-item label="商品类型名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span></el-dialog>
  </div>
</template>

<script>
import { addskuClassApi } from '@/api/sku'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formData: {
        name: ''
      },
      formRules: {
        name: [
          { required: true, message: '商品类型名称不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const isRepeat = this.tableData.some((item) => {
                return item.className === value
              })
              if (isRepeat) return callback(new Error('商品名称重复'))
              callback()
            },
            trigger: 'blur'
          },
          {
            min: 1,
            max: 10,
            message: '商品类型名称要求1-10个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {},
  methods: {
    async onSave() {
      await this.$refs.form.validate()
      await addskuClassApi(this.tableData)
    }
  }
}
</script>

<style scoped>

</style>

