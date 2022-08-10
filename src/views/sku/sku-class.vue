<template>
  <div class="skuClss_container">
    <div class="skuClssHeader">
      <template>
        <el-card class="box-card">
          <el-form ref="form" :inline="true" label-width="120px">
            <el-form-item label="商品类型搜索：">
              <el-input v-model="searchClass" placeholder="请输入" />
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" type="primary" @click="searchSku">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </template>
    </div>
    <div class="skuClssContent">
      <el-button icon="el-icon-circle-plus-outline" type="warning" @click="addSku">新建</el-button>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column
            prop="className"
            label="商品类型名称"
            width="580"
          />
          <el-table-column
            prop="right"
            label="操作"
          >
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="putskuClass(row)">修改</el-button>
              <el-button type="text" size="small" @click="deleteskuClassApi(row.classId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <template>
      <div>
        <el-dialog
          :title="dialigTitle"
          :visible="dialogVisible"
          width="55%"
          @close="btnCancel"
        >
          <el-form
            ref="roleForm"
            :model="formData"
            :rules="formRules"
            label-width="130px"
          >
            <el-form-item label="商品类型名称：" prop="name">
              <el-input v-model="formData.name" placeholder="请输入" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="btnCancel">取 消</el-button>
            <el-button type="primary" @click="onSave">确 定</el-button>
          </span></el-dialog>
      </div>
    </template>
  </div>

</template>

<script>
import { getskuClassApi, deleteskuClassApi, putskuClassApi, searchskuClassApi, addskuClassApi } from '@/api/sku'
export default {
  data() {
    return {
      searchClass: '',
      tableData: [],
      dialogVisible: false,
      skuId: '',
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
  computed: {
    dialigTitle() {
      return this.skuId ? '修改商品类型' : '新建商品类型'
    }
  },

  created() {
    this.getSkuClass()
  },

  methods: {
    async getSkuClass() {
      const res = await getskuClassApi()
      // console.log(res)
      this.tableData = res.data.currentPageRecords
    },
    addSku() {
      this.dialogVisible = true
    },
    async deleteskuClassApi(classId) {
      try {
        await this.$confirm('确定删除商品类型吗')
        await deleteskuClassApi(classId)
        this.getSkuClass()
        this.$message.success()
      } catch (error) {
        console.log(error)
      }
    },
    putskuClass(row) {
      this.formData.name = row.className
      this.skuId = row
      this.dialogVisible = true
    },
    async onSave() {
      try {
        await this.$refs.roleForm.validate()
        if (this.skuId) {
          await putskuClassApi(
            this.data = this.skuId,
            this.className = this.formData.name)
        } else {
          await addskuClassApi(
            this.formData.name
          )
        }

        // 重新拉取数据
        this.$message.success('操作成功')
        this.dialogVisible = false
        this.getSkuClass()
      } catch (error) {
        console.log(error)
      }
    },
    async searchSku() {
      const res = await searchskuClassApi()
      console.log(res)
      this.tableData = res.data.currentPageRecords.filter((item) => {
        return item.className === this.searchClass
      })
    },
    btnCancel() {
      this.formData.name = ''
      // 移除校验
      this.$refs.roleForm.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.skuClss_container {
  .skuClssContent {
    margin-top: 30px;
    background-color: #fff;
   .el-button{
    margin: 20px;
}
    }
  }
</style>
