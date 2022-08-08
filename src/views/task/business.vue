<template>
  <div>
    <el-card class="box-card">
      <SearchCard></SearchCard>

      <!-- 按钮 -->
      <!-- <headBtn
        :btnType="mainBtnType"
        :btnLabel="mainBtnLabelName"
        :btnIcon="mainBtnIcon"
      ></headBtn> -->
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-button
              type="warning"
              size="small"
              icon="el-icon-plus"
              @click="onClick"
              >新建</el-button
            >
            <el-button
              type="warning"
              size="small"
              class="btn"
              @click="onCollocate"
              >工单配置</el-button
            >
          </el-col>
        </el-row>
      </div>
      <!-- 表单 -->
      <BusTable :tableData="tableData"></BusTable>

      <!-- 弹层 -->
      <AddTask :visible.sync="dialogVisible"></AddTask>
      <!-- 工单配置弹层 -->
      <collocate :visible.sync="dialogcollocate"></collocate>
    </el-card>
  </div>
</template>

<script>
import { getTask } from "@/api/task";
import SearchCard from "@/components/SearchCard";
import headBtn from "@/components/headBtn";
import AddTask from "./components/addTask.vue";
import BusTable from "./components/busTable.vue";
import collocate from "./components/collocate";

export default {
  data() {
    return {
      tableData: [],
      // headBtnType: "primary",
      // mainBtnType: "warning",
      // headBtnLabelName: "查询",
      // mainBtnLabelName: "新增",
      // headBtnIcon: "el-icon-search",
      // mainBtnIcon: "el-icon-circle-plus-outline",
      dialogVisible: false,
      dialogcollocate: false,
    };
  },
  components: {
    SearchCard,
    headBtn,
    AddTask,
    BusTable,
    collocate,
  },
  created() {
    this.getTask();
  },
  methods: {
    async getTask() {
      const res = await getTask();
      // console.log(res);
      this.tableData = res.data.currentPageRecords;
    },
    onClick() {
      this.dialogVisible = true;
    },
    // 工单配置
    onCollocate() {
      this.dialogcollocate = true;
    },
    // 获取补货预警值
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #ccc;
}
.el-button--warning {
  background-color: #fc6f2a;
}
.btn {
  background-color: #fbf4f0;
  border-color: #fbf4f0;
  color: #555;
}
.el-table--border {
  margin-top: 20px;
}
.eltable {
  background-color: pink !important;
}
.el-table--fit {
  margin: 30px !important;
}
</style>
