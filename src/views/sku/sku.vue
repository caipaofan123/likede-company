<template>
  <div class="sku_container">
    <div class="skuHeader">
      <template>
        <el-card class="box-card">
          <el-form ref="form" :inline="true" label-width="120px">
            <el-form-item label="商品搜索：">
              <el-input v-model="skuName" placeholder="请输入" />
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" type="primary" @click="searchSkuName">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </template>
    </div>
    <div class="skuContent">
      <el-button icon="el-icon-circle-plus-outline" type="warning">新建</el-button>
      <el-button icon="el-icon-circle-plus-outline" type="warning">导入数据</el-button>
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
            prop="skuName"
            label="商品名称"
          />
          <el-table-column
            prop="className"
            label="商品图片"
          ><template slot-scope="scope">
            <img class="skuImgs" :src="scope.row.skuImage" alt="">
          </template>
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌"
          />
          <el-table-column
            prop="unit"
            label="规格"
          />
          <el-table-column
            prop="price"
            label="商品价格"
            :formatter="tasCreatePrice"
          />
          <el-table-column
            prop="skuClass.className"
            label="商品类型"
          />

          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
          />

          <el-table-column
            prop="right"
            label="操作"
          >
            <template slot-scope="{}">
              <el-button type="text" size="small" @click="uptsku">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="sku_bottom">
          <div class="pages">
            共{{ pages.totalCount }}条记录 第{{ pages.pageIndex }}/{{ pages.totalPage }} 页
          </div>
          <el-row>
            <el-button type="primary" :disabled="disabled" plain @click="upPage">上一页</el-button>
            <el-button type="success" :disabled="disabled1" plain @click="downPage">下一页</el-button>
          </el-row>
        </div>
      </template>
    </div>
    <template>
      <div>
        <el-dialog
          title="修改商品"
          :visible="dialogVisible"
          width="630px"
          @close="btnCancel"
        >
          <el-form
            ref="formData"
            :v-model="formData"
            label-width="130px"
          >
            <el-form-item label="商品名称" prop="skuName">
              <el-input
                v-model="formData.skuName"
                maxlength="10"
              />
            </el-form-item>
            <el-form-item label="品牌" prop="brandName">
              <el-input
                v-model="formData.brandName"
                show-word-limit
                maxlength="10"
              />
            </el-form-item>
            <el-form-item label="商品价格(元)：" prop="price">
              <el-input-number v-model="formData.price" controls-position="right" :min="0.01" :max="10" @change="handleChange" />
            </el-form-item>
            <el-form-item label="商品类型" prop="classId">
              <el-select v-model="formData.classId" placeholder="请选择商品类型" style="width: 100%">
                <!-- <el-option :label="item.className" :value="item.classId" /> -->
              </el-select>
            </el-form-item>
            <el-form-item label="规格" prop="unit">
              <el-input
                v-model="formData.unit"
                show-word-limit
                maxlength="10"
              />
            </el-form-item>
            <el-form-item label="商品图片" prop="">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="formData.skuImage" :src="formData.skuImage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
                <div slot="tip" class="el_upload__tip">
                  仅支持扩展名为jpg/png文件，且不超过100kb
                </div>
              </el-upload>
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
import { searchskuApi, getImgUrlApi } from '@/api/sku'
export default {
  data() {
    return {
      aa: '',
      imageUrl: '',
      disabled: false,
      disabled1: false,
      tableData: [],
      pages: [],
      dialogVisible: false,
      num: 1,
      skuName: '',
      pageIndex: 1,
      formData: {
        skuImage: '',
        unit: '',
        classId: '',
        price: '',
        brandName: '',
        skuName: '',
        skuId: ''
        // item: {
        //   className: '',
        //   classId: ''
        // }
        // rules: {
        //   // 表单校验
        //   skuImage: [{ required: true, message: '请选择图片', trigger: 'blur' }],
        //   unit: [{ required: true, message: '请输入商品规格', trigger: 'blur' }],
        //   classId: [
        //     { required: true, message: '请选择商品类型', trigger: 'blur' }
        //   ],
        //   price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        //   brandName: [
        //     { required: true, message: '请输入品牌名称', trigger: 'blur' }
        //   ],
        //   skuName: [
        //     { required: true, message: '请输入商品名称', trigger: 'blur' }
        //   ]
        // }
      }
    }
  },

  created() {
    this.searchsku()
  },

  methods: {
    // 页面数据请求
    async searchsku() {
      const res = await searchskuApi()
      this.tableData = res.data.currentPageRecords
      this.pages = res.data

      console.log(res)
    },
    // 价格
    tasCreatePrice(row) {
      const num = row.price / 100
      return num.toFixed(2)
    },
    // 关闭弹窗
    btnCancel() {
      this.dialogVisible = false
    },
    handleChange() {
      console.log(1)
    },
    // 确定按钮
    onSave() {
      console.log(1)
    },
    // 点击修改开启弹窗
    uptsku() {
      this.dialogVisible = true
    },
    // 搜索商品
    async searchSkuName() {
      console.log(this.skuName)
      const res = await searchskuApi(this.skuName)
      this.tableData = res.data.currentPageRecords
      this.pages = res.data
    },
    // 上一页
    async upPage() {
      if (this.pageIndex <= 1) {
        this.disabled = true
      } else {
        this.disabled1 = false

        const res = await searchskuApi(this.skuName = '', this.pageIndex = this.pageIndex - 1)
        this.tableData = res.data.currentPageRecords
        this.pages = res.data
      }
    },
    // 下一页
    async downPage() {
      if (this.pageIndex === +this.pages.totalPage - 1) {
        console.log(this.pages.totalPage.totalPage)
        this.disabled1 = true
      }
      this.disabled = false
      const res = await searchskuApi(this.skuName = '', this.pageIndex = this.pageIndex + 1)
      this.tableData = res.data.currentPageRecords
      this.pages = res.data
    },
    async handleAvatarSuccess(reg, file) {
      console.log(reg)
      console.log(file)
      const formData = new FormData()
      formData.append('fileName', file.raw)
      const res = await getImgUrlApi(formData)
      this.formData.skuImage = res
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG ISPNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG && isLt2M) || (isPNG && isLt2M)
    }

  }
}
</script>

<style scoped lang="scss">
.sku_container {
  .skuContent {
    margin-top: 30px;
    background-color: #fff;
    .skuImgs{
      width: 28px;
      height: 28px;
      background: #f3f6fb;
    }
   .el-button{
    margin: 20px -10px 20px 20px;
}
    }
  }
  .sku_bottom {
     display: flex;
    justify-content: space-between;
    padding: 20px;
    .pages {
      padding-top: 10px;
      padding-left: 20px;
      color: #dbdfe5;
    }
  }
    .el-input-number {
    position: relative;
    display: inline-block;
    width: 460px;
    line-height: 38px;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

