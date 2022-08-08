<template>
  <div class="order_container">
    <div class="order_header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单编号：">
          <el-input v-model="formInline.user" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker v-model="formInline.date1" type="date" placeholder="选择开始日期" style="width: 100%;" />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="formInline.date2" type="date" placeholder="选择结束日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="order_content">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="序号"
            width="80"
          />
          <el-table-column
            prop="orderNo"
            label="订单编号"
            width="220"
          />
          <el-table-column
            prop="skuName"
            label="商品名称"
          />
          <el-table-column
            prop="amount"
            label="订单金额(元)"
          />
          <el-table-column
            prop="innerCode"
            label="设备编号"
          />
          <el-table-column
            prop="status"
            label="订单状态"
          />
          <el-table-column
            prop="createTime"
            label="订单日期"
          />
          <el-table-column
            prop="address"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="order_bottom">
        <div class="pages">
          共{{ pages.totalCount }}条记录 第{{ 1 }}/{{ pages.totalPage }} 页
        </div>
        <el-row>
          <el-button type="primary" plain>上一页</el-button>
          <el-button type="success" plain>下一页</el-button>
        </el-row>
      </div>
    </div>

  </div>

</template>

<script>
import { getOrderApi } from '@/api/order'
export default {
  data() {
    return {
      formInline: {
        user: '',
        date1: '',
        date2: ''
      },
      pageIndex: 1,
      endDate: 10,
      tableData: [],
      pages: []
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    async getOrder() {
      const res = await getOrderApi()
      this.tableData = res.data.currentPageRecords
      console.log(this.tableData)
      this.pages = res.data
    },
    async downPage() {
      this.getOrder(this.pageIndex + 1)
    }
  }
}
</script>

<style scoped lang="scss">
.order_container {
  .order_header {
    width: 1330px;
    padding: 20px 20px 0 20px;
    margin-bottom: 20px;
    background-color: #fff;
  }
  .order_content {
    width: 1330px;
    background-color: #fff;

  }
  .order_bottom {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    .pages {
      padding-top: 10px;
      padding-left: 20px;
      color: #dbdfe5;
    }
  }
}
</style>
