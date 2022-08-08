<template>
  <el-form-item :label="label">
    <el-input v-model="headInput" placeholder="请输入内容"></el-input>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      headInput: "",
    };
  },
  props: {
    label: {
      default: "****",
      type: String,
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0px;
  .el-form-item__label {
    line-height: 36px;
  }
  .el-form-item__content {
    line-height: 36px;
    margin-left: 15px !important;
    .el-input__inner {
      padding-right: 30px;
    }
  }
}
</style>
