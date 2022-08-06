<template>
  <el-card class="box-card">
    <el-form ref="form" :model="form" label-width="100px" >
      <el-form-item label="工单编号：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="工单状态:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },

  created() {},

  methods: {},
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
.el-form{
    display: flex;
}
.el-form-item {
  width: 300px;
}
</style>
