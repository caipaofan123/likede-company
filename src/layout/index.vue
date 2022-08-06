<template>
  <div class="layout">
    <el-container>
      <el-header><Dheader></Dheader></el-header>
      <el-container>
        <el-aside width="167px"><Dsidebar></Dsidebar></el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Dheader from "@/layout/components/header.vue";
import Dsidebar from "@/layout/components/sidebar.vue";
export default {
  data() {
    return {};
  },
  components: {
    Dheader,
    Dsidebar
  },
  created() {},

  methods: {},
};
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  //   background-color: hotpink;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0 0;
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
