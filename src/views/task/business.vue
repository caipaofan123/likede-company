<template>
  <div>
    <el-card class="box-card">
      <el-form
        ref="form"
        :inline="true"
        :model="formInline"
        label-width="100px"
      >
        <el-form-item label="工单编号：">
          <el-input v-model="formInline.innerCode"></el-input>
        </el-form-item>
        <el-form-item label="工单状态:">
          <el-select v-model="formInline.status" placeholder="请选择活动区域">
            <el-option
              v-for="item in taskStatusList"
              :key="item.statusId"
              :label="item.statusName"
              :value="item.statusId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->

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
import { searchTasks, getTaskStatus } from "@/api/task";
// import SearchCard from "@/components/SearchCard";
import AddTask from "./components/addTask.vue";
import BusTable from "./components/busTable.vue";
import collocate from "./components/collocate";

export default {
  name: "business",
  data() {
    return {
      // 查询输入数据
      formInline: {
        innerCode: "",
        status: "",
      },
      tableData: [],
      taskStatusList: [],
      dialogVisible: false,
      dialogcollocate: false,
    };
  },
  components: {
    // SearchCard,

    AddTask,
    BusTable,
    collocate,
  },
  created() {
    this.searchTasks();
    this.getTaskStatus();
  },
  methods: {
    async searchTasks() {
      const res = await searchTasks({
        isRepair: false,
      });
      console.log(res);
      this.tableData = res.data.currentPageRecords;
      // console.log(this.tableData);
    },
    //获取工单状态
    async getTaskStatus() {
      const res = await getTaskStatus();
      console.log(res);
      this.taskStatusList = res.data;
      // console.log(this.taskStatusList);
    },
    onClick() {
      this.dialogVisible = true;
    },
    // 工单配置
    onCollocate() {
      this.dialogcollocate = true;
    },
    //搜索查询
    async search() {
      await this.searchTasks(this.formInline);
      // console.log(1111);
    },
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
