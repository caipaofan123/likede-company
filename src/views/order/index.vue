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
            type="index"
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
            :formatter="tasCreateAmount"
          />
          <el-table-column
            prop="innerCode"
            label="设备编号"
          />
          <el-table-column
            prop="status"
            label="订单状态"
            :formatter="tasCreateType"
          />
          <el-table-column
            prop="createTime"
            label="订单日期"
          />
          <el-table-column
            prop="address"
            label="操作"
          >
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="handleClick(row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="order_bottom">
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
      <el-dialog
        title="订单详情"
        :visible.sync="dialogVisible"
        width="630px"
        :before-close="handleClose"
      >
        <div class="el-dialog_content">
          <div class="content_top">
            <div>
              <img align="center" src="~@/assets/images/status.png" alt="">
              <span class="content_top_status">{{ 111 }}</span>
            </div>
            <span>
              <img src="~@/assets/images/orderImg.png" alt="">
            </span>
          </div>
        </div>
        <div class="content_bot">
          <ul>
            <li>
              订单编号：<sapn>{{ orderDetail.orderNo }}</sapn>
            </li>
            <li>
              订单金额：<sapn>{{ orderDetail.amount }}</sapn>
            </li>
            <li>
              创建时间：<sapn>{{ orderDetail.createTime }}</sapn>
            </li>
            <li>
              支付方式：<sapn>{{ orderDetail.createTime }}</sapn>
            </li>
          </ul>
          <ul>
            <li>

              商品名称：<sapn>{{ orderDetail.skuName }}</sapn>
            </li>
            <li>
              设备编号：<sapn>{{ orderDetail.innerCode }}</sapn>

            </li>
            <li>
              完成时间：<sapn>{{ orderDetail.updateTime }}</sapn>

            </li>
            <li>
              设备地址：<sapn>{{ orderDetail.regionName }}</sapn>

            </li>

          </ul>
        </div>
      </el-dialog>
    </template>
  </div>

</template>

<script>
// 格式化时间
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale = ('zh-cn')
import { getOrderApi } from '@/api/order'
export default {
  data() {
    return {
      formInline: {
        user: '',
        date1: '',
        date2: ''
      },
      disabled: false,
      disabled1: false,
      pageIndex: 1,
      endDate: 10,
      tableData: [],
      pages: [],
      dialogVisible: false,
      orderDetail: [],
      createdTime: '',
      endTime: ''
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    // 搜索
    async onSubmit() {
      // console.log(this.formInline.date2)
      if (this.formInline.date === '') {
        this.createdTime = ''
      } else {
        this.createdTime = dayjs(this.formInline.date1).format('YYYY-MM-DD')
      }
      if (this.formInline.date === '') {
        this.endTime = ''
      } else {
        this.endTime = dayjs(this.formInline.date2).format('YYYY-MM-DD')
      }
      const res = await getOrderApi(
        this.orderNo = this.formInline.user,
        this.pageIndex = '',
        this.startDate = this.createdTime,
        this.endDate = this.endTime
      )
      console.log(dayjs(this.formInline.date).format('YYYY-MM-DD'))
      this.tableData = res.data.currentPageRecords
      this.pages = res.data
    },
    async getOrder() {
      const res = await getOrderApi()
      this.tableData = res.data.currentPageRecords
      this.pages = res.data
    },
    tasCreateType(row, column, index) {
      return ['创建', '支付完成', '出货完成', '出货失败'][index]
    },
    tasCreateAmount(row) {
      const num = row.amount / 100
      return num.toFixed(2)
    },
    handleClick(row) {
      this.dialogVisible = true
      this.orderDetail = row
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 上一页
    async upPage() {
      if (this.pageIndex <= 1) {
        this.disabled = true
      } else {
        this.disabled1 = false

        const res = await getOrderApi(this.orderNo = '', this.pageIndex = this.pageIndex - 1)
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
      const res = await getOrderApi(this.orderNo = '', this.pageIndex = this.pageIndex + 1)
      console.log(this.pageIndex)

      this.tableData = res.data.currentPageRecords
      this.pages = res.data
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
  .el-dialog_content {
    display: flex;
    justify-content: space-between;
    background: #f8f8f8;
    span {
      position: relative;
      img {
        position: absolute;
        top: -60px;
        right: -490px;
      }
    }
  }
.el-dialog_content {
  .content_top {
    height: 54px;
    padding: 18px 26px;
    .content_top_status {
      padding-left: 12px;
      padding-top: 4px;
      font-size: 18px;
    }
  }
}
.content_bot{
    display: flex;
    }
    ul li {
      list-style: none;
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
</style>
