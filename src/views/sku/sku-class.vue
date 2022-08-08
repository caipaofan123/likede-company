<template>
  <div class="skuClss_container">
    <div class="skuClssHeader">
      <SearchCard />
    </div>
    <div class="skuClssContent">
      <el-button icon="el-icon-circle-plus-outline" type="warning" @click="addSku">新建</el-button>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="classId"
            label="序号"
            width="80"
          />
          <el-table-column
            prop="className"
            label="商品类型名称"
            width="980"
          />
          <el-table-column
            prop="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="handleClick(scope.row,onRemove)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <skuTools :visible="dialogVisible" :table-data="tableData" />
  </div>

</template>

<script>
import skuTools from './components/sku-tools.vue'
import { getskuClassApi } from '@/api/sku'
import SearchCard from '@/components/SearchCard'
export default {
  components: { SearchCard, skuTools },
  data() {
    return {
      tableData: [],
      dialogVisible: false
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
    handleClick() {
      this.dialogVisible = true
    },
    async onRemove() {
      // console.log(this.tableData.classId)
      console.log(11)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('点击确认删除')
        console.log(this.tableData)
      })
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
