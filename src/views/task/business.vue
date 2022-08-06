<template>
  <div>
    <SearchCard></SearchCard>
    <el-card class="box-card">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="userId" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="taskCode" label="工单编号" width="80">
          </el-table-column>
          <el-table-column prop="innerCode" label="设备编号" width="80">
          </el-table-column>
          <el-table-column prop="taskType" label="工单类型" width="80">
          </el-table-column>
          <el-table-column prop="updateTime" label="工单方式" width="80">
          </el-table-column>
          <el-table-column prop="taskStatus" label="工单状态" width="80">
          </el-table-column>
          <el-table-column prop="userName" label="运营人员" width="80">
          </el-table-column>
          <el-table-column prop="updateTime" label="创建日期" width="80">
          </el-table-column>
          <el-table-column prop="updateTime" label="操作"> </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import {getTask} from '@/api/task'
import SearchCard from "@/components/SearchCard";
export default {
  data() {
    return {
      tableData:[]
    };
  },
  components: {
    SearchCard,
  },
  created() {
    this.getTask()
  },

  methods: {
     async getTask(){
      const res = await getTask()
      console.log(res);
      this.tableData=res.data.currentPageRecords
    }
  },
};
</script>

<style scoped></style>
