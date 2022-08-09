<template>
  <div>
    <!-- 搜索栏 -->
    <div class="search">
      <el-form label-width="80px">
        <el-form-item label="点位搜索:">
          <el-input v-model="IptVal" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="区域搜索:">
          <el-select v-model="value" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in tableData"
              :key="index"
              :label="item.region.name"
              :value="item.region.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click.native="searchBtn"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 结果栏 -->
    <div class="result">
      <el-button
        @click.native="addNode"
        type="warning"
        icon="el-icon-circle-plus-outline"
        >新增</el-button
      >
      <!-- 主页面table -->
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            :index="indexMethod"
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="name" label="点位名称" width="270">
          </el-table-column>
          <el-table-column prop="region[name]" label="所在区域" width="270">
          </el-table-column>
          <el-table-column
            prop="businessType[name]"
            label="商圈类型"
            width="270"
          >
          </el-table-column>
          <el-table-column prop="ownerName" label="合作商" width="270">
          </el-table-column>
          <el-table-column
            prop="addr"
            label="详细地址"
            :formatter="formatter"
            width="270"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detailBtn(scope)">
                查看详情
              </el-button>
              <el-button
                type="text"
                size="small"
                @click.native="changeNode(scope)"
              >
                修改
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          background
          layout="total,prev,pager,next"
          :total="totalCount"
          :size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          :current-page.sync="pageIndex"
          @prev-click="searchBtn(pageIndex - 1)"
          @next-click="searchBtn(pageIndex + 1)"
        >
        </el-pagination>
      </div>
      <!-- 点击新增按钮触发对话框 -->
      <el-dialog :title="activeTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="点位名称" :label-width="formLabelWidth">
            <el-input autocomplete="off" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="所在区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option
                :label="item.region.name"
                :value="item.region.name"
                v-for="(item, index) in this.tableData"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属商圈" :label-width="formLabelWidth">
            <el-select v-model="form.businessArea" placeholder="请选择">
              <el-option
                :label="item.businessType.name"
                :value="item.businessType.id"
                v-for="(item, index) in this.tableData"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属合作商" :label-width="formLabelWidth">
            <el-select v-model="form.partner" placeholder="请选择">
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in this.newOwnerArrs"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <!-- <el-select placeholder="请选择" v-model="form.addr">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
            <el-cascader
              v-model="addCascaderVal"
              :options="cityData"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="form.desc"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="searchBtn">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 点击查看详情的对话框 -->
      <el-dialog
        title="点击详情"
        :visible.sync="dialogTableVisible"
        width="40%"
      >
        <el-table :data="nodeDetail">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column
            property="innerCode"
            label="机器编号"
            width="200"
          ></el-table-column>
          <el-table-column
            property="vmStatus"
            label="设备状态"
            :formatter="formatterStatus"
          ></el-table-column>
          <el-table-column
            property="lastSupplyTime"
            label="最后一次供货时间"
            :formatter="formatterTime"
          ></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headBtn from "@/views/node/components/headBtn.vue";
import dayjs from "dayjs";
import { regionData } from "element-china-area-data";
import {
  searchNodeApi,
  addNodeApi,
  NodeDetailApi,
  deleteNodeApi,
  changeNodeApi,
} from "@/api/node/nodeList";

export default {
  data() {
    return {
      IptVal: "",
      tableData: [], // table表格用到的数据
      totalCount: 0,
      pageSize: "",
      pageIndex: "",
      value: "",
      activeTitle: "",
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        name: "",
        region: "",
        businessArea: "",
        partner: "",
        addr: "",
        desc: "",
      },
      newOwnerArrs: [],
      nodeDetail: [],
      dialogTableVisible: false,
      cityData: regionData,
      addCascaderVal: "",
    };
  },
  components: { headBtn },
  created() {
    this.searchBtn();
  },
  methods: {
    indexMethod(index) {
      return index + (this.pageIndex - 1) * 10 + 1;
    }, // 表格index
    async searchBtn(index) {
      this.pageIndex = index;
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        IptVal: this.IptVal,
        selectVal: this.selectVal,
      };

      const dataBody = {};

      const {
        data: {
          currentPageRecords,
          pageIndex,
          pageSize,
          totalCount,
          totalPage,
        },
      } = await searchNodeApi(params);
      // table表格用到的数据
      console.log(currentPageRecords);
      this.tableData = currentPageRecords;
      this.totalCount = Number(totalCount);
      // 切换页码请求参数
      this.pageSize = Number(pageSize);
      this.pageIndex = Number(pageIndex);
      console.log(this.pageIndex);
      console.log(this.tableData);
      let ownerArr = [];
      this.tableData.forEach((item) => {
        ownerArr.push(item.ownerName);
      });
      let newOwnerArr = Array.from(new Set(ownerArr));
      this.newOwnerArrs = newOwnerArr;
    }, // 查找
    formatter(row, column) {
      return row.addr.split("-").slice(-1);
    },
    async addNode() {
      this.dialogFormVisible = true;
      this.activeTitle = "添加点位";
      this.form = {};
      // const res = await addNodeApi();
      // console.log(res);
    }, //添加点位
    async detailBtn(scope) {
      console.log(scope);
      const res = await NodeDetailApi(scope.row.id);
      this.nodeDetail = res.data;

      this.dialogTableVisible = true;
    }, //详情
    formatterStatus(row, column) {
      switch (row.vmStatus) {
        case 0:
          row.vmStatus = "未投放";
          break;
        case 1:
          row.vmStatus = "运营";
          break;
        case 3:
          row.vmStatus = "撤机";
          break;
      }
      return row.vmStatus;
    },
    formatterTime(row, column) {
      console.log(dayjs().format("YYYY.MM.DD HH:mm:ss"));
      return dayjs(row.createTime).format("YYYY.MM.DD HH:mm:ss");
    },
    async deleteRow(scope) {
      try {
        const res = await deleteNodeApi(scope.row.id);
      } catch (error) {
        this.$message({
          showClose: true,
          message: "演示系统，不支持此操作",
          type: "warning",
        });
      }
    }, // 删除点位
    async changeNode(scope) {
      const data = {
        name: scope.row.name,
        addr: scope.row.addr,
        areaCode: scope.row.areaCode,
        createUserId: scope.row.createUserId,
        regionId: scope.row.regionId,
        businessId: scope.row.businessId,
        ownerId: scope.row.ownerId,
        ownerName: scope.row.ownerName,
      };
      const res = await changeNodeApi(scope.row.id, data);
      console.log(res);
      console.log(scope);
      this.dialogFormVisible = true;
      this.activeTitle = "修改点位";
      this.form.name = scope.row.name;
      this.form.region = scope.row.region.name;
      this.form.businessArea = scope.row.businessType.name;
      this.form.partner = scope.row.ownerName;
      this.form.addr = scope.row.addr;
      this.form.desc = scope.row.addr.split("-").slice(-1);
    }, // 修改点位
  },
};
</script>

<style scoped lang="scss">
.search {
  display: flex;
  height: 64px;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  .el-form {
    display: flex;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .cell {
    padding-left: 0px;
    .el-button {
      border: 0px solid #f5f7fa;
    }
    .btn1 {
      color: #5f84ff;
    }
    .btn2 {
      color: #ff5a5a;
    }
    button {
      border: #fff;
      background: #fff;
    }
  }
  .block {
    text-align: center;
    margin-top: 15px;
  }
}
</style>
