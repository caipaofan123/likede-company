<template>
  <el-form ref="form" :model="form" label-width="100px">
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
</template>

<script>

export default {
  name:'SearchCard',
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

  created() {
    this.getTask();
  },
  methods: {
   
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
