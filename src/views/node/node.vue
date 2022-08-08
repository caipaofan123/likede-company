<template>
  <div>
    <div class="head">
      <el-form label-width="80px">
        <headInput :label="labelName"></headInput>
      </el-form>
    </div>
    <div></div>
  </div>
</template>

<script>
import headInput from "./components/headInput.vue";
export default {
  data() {
    return {
      labelName: "区域搜索:",
    };
  },
  components: {
    headInput,
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.head {
  display: flex;
  height: 64px;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
}
</style>
