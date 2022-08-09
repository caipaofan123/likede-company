<template>
  <!-- 表格数据 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column prop="taskCode" label="工单编号" width="120" />
    <el-table-column prop="innerCode" label="设备编号" width="120" />
    <el-table-column prop="taskType.typeName" label="工单类型" width="120" />
    <el-table-column
      prop="createType"
      label="工单方式"
      :formatter="tasCreateType"
      width="120"
    />
    <el-table-column
      prop="taskStatusTypeEntity.statusId"
      label="工单状态"
      :formatter="tasStatusId"
      width="100"
    />
    <el-table-column prop="userName" label="运营人员" width="120" />
    <el-table-column prop="updateTime" label="创建日期" width="160" />
    <el-table-column prop="name" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    },
  },
  components: {},
  methods: {
    // 处理工单方式

    tasCreateType(row) {
      return row.createType === "1" ? "自动" : "手动";
    },
    tasStatusId(row, column, index) {
      return ["待办", "进行", "取消", "完成"][index];
    },
   
  },
  created() {},
  updated() {},
  mounted() {},
  filters: {},
  computed: {},
  watch: {},
};
</script>
<style lang="less" scoped></style>
