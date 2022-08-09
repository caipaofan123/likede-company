<template>
  <div>
    <el-form class="elform" ref="form" label-width="100px" :inline="true">
      <el-form-item label="活动名称">
        <el-input v-model="search"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchPolicy"
        >搜索</el-button
      >
    </el-form>
    <div class="btn">
      <el-button
        type="warning"
        size="small"
        icon="el-icon-plus"
        @click="visAlter = true"
        >新建</el-button
      >
      <!-- 表格 -->
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column
            v-model="amend.policyName"
            prop="policyName"
            label="策略名称"
            width="360"
          >
          </el-table-column>
          <el-table-column
            v-model="amend.discount"
            prop="discount"
            label="策略方案"
            width="340"
          >
          </el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="160">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="{ row }">
              <el-button @click="handleClick(row)" type="text" size="small"
                >查看</el-button
              >
              <el-button type="text" size="small" @click="onClick(row)"
                >修改</el-button
              >
              <el-button
                type="text"
                size="small"
                class="elbutton"
                @click="deleteRow(row.policyId)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 弹框 -->
      <alter :visible.sync="visAlter" :amend="amend" ref="dialog"></alter>

      

      <!-- 表格弹框 -->
      <el-button
        type="text"
        @click="dialogTableVisible = true"
        @close="onclose"
      ></el-button>

      <el-dialog title="策略方案" :visible.sync="dialogTableVisible">
        <el-form ref="form" label-width="80px">
          <el-form-item label="区域名称 :">
            <div>{{ amend.policyName }}</div>
          </el-form-item>
        </el-form>
        <el-table :data="lookPolicy">
          <el-table-column label="策略方案：" width="90px"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="100px"
          ></el-table-column>
          <el-table-column
            property="nodeName"
            label="点位名称"
            width="200px"
          ></el-table-column>
          <el-table-column
            property="innerCode"
            label="设备编号"
            width="200px"
          ></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          layout="prev,next"
          :total="50"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  gePolicyApi,
  deletePolicyApi,
  lookPolicyApi,
  searchPolicyApi,
} from "@/api/policy";
import alter from "./components/alter.vue";

export default {
  data() {
    return {
      tableData: [],
      visAlter: false,
      amend: {
        policyName: "",
        discount: "",
        policyId: "",
      },
      search: "",

      dialogTableVisible: false,
      lookPolicy: [],
    };
  },

  created() {
    this.gePolicy();
  },

  methods: {
    async gePolicy() {
      const res = await gePolicyApi();
      // console.log(res);
      this.tableData = res.data.currentPageRecords;
    },
    onClick(row) {
      this.policyId = row.policyId;
      // console.log(this.policyId);
      // 数据回显
      this.$refs.dialog.alter(row);
      // console.log(row.policyName, row.discount);
      this.visAlter = true;
    },
    async deleteRow(id) {
      // console.log(id);
      try {
        // t弹窗
        await this.$confirm("确认删除该角色吗");
        // 调用接口
        await deletePolicyApi(id); //调用接口
        this.gePolicy(); //调用获取数据方法
        this.$message.success("删除成功");
      } catch (e) {
        console.log(e);
      }
    },
    // 点击查看获取接口
    async handleClick(row) {
      // console.log(row);
      this.amend.policyName = row.policyName; //把值赋值给amend.policyName
      const res = await lookPolicyApi(row.policyId);
      // console.log(res.data.currentPageRecords);
      this.lookPolicy = res.data.currentPageRecords; //把获取到的值赋给lookPolicy
      this.dialogTableVisible = true; //显示弹框
    },
    // 关闭弹窗
    onclose() {
      this.$emit("update:visible", false);
    },
    // 搜索策略
    async searchPolicy() {
      const res = await searchPolicyApi((this.policyName = this.search));
      this.tableData = res.data.currentPageRecords;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.searchPolicy();
    },
  },
  components: {
    alter,
  },
};
</script>

<style scoped>
.elform {
  height: 64px;
  padding-top: 13px;
  background-color: #fff;
}
.btn {
  height: 1000px;
  background-color: #fff;
  margin-top: 10px;
  padding: 15px 15px;
}
.el-button--warning {
  background-color: #fc6f2a;
}
.elbutton {
  color: red;
}
</style>
