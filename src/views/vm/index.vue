<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form"  label-width="100px">
        <el-form-item label="设备编号：">
          <el-input></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="tableData" style="width: 100%">
       <el-table-column
       label="序号"
      type="index"
      >
    </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import {getVms} from '@/api/vm'
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },

  created() {
    // this.getVms()
  },

  methods: {
    // async getVms(){
    //   const res= await getVms()
    //   console.log(res);
    // }
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 1280px;
}
.el-form {
  display: flex;
}
.el-form-item {
  width: 300px;
}
</style>
