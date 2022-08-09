<template>
  <el-button :type="btnType" :icon="btnIcon">{{ btnLabel }}</el-button>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["btnType", "btnLabel", "btnIcon"],
  created() {},

  methods: {},
};
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
</style>
