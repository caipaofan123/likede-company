<template>
  <el-dialog title="新增人员" :visible.sync="dialogVisible" width="30%">
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="dialogVisible = false"
        class="established-button"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
    };
  },
  methods: {},
};
</script>

<style scoped>
.established-button {
  background-color: #ff6625;
  color: #fff;
}
</style>
