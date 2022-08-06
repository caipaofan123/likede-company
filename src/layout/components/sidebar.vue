<template>
  <el-menu
    router
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/">
      <i class="el-icon-loading"></i>
      <span slot="title">帝可得</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-cold-drink"></i>
        <span>工单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/task">运营工单</el-menu-item>
        <el-menu-item index="/task/operation">运维工单</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-position"></i>
        <span>点位管理</span>
      </template>
      <el-menu-item-group >
        <el-menu-item index="/node">区域管理</el-menu-item>
        <el-menu-item index="/node/node">点位管理</el-menu-item>
        <el-menu-item index="/node/partner">合作商管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-shopping-bag-1"></i>
        <span>设备管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/vm">设备管理</el-menu-item>
        <el-menu-item index="/vm/status">设备状态</el-menu-item>
        <el-menu-item index="/vm/type">设备类型管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-coordinate"></i>
        <span>人员管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user">人员列表</el-menu-item>
        <el-menu-item index="/user/user-task-stats">人效统计</el-menu-item>
        <el-menu-item index="/user/user-work">工作量列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/sku">商品类型</el-menu-item>
        <el-menu-item index="/sku/sku">商品管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/policy">
      <i class="el-icon-menu"></i>
      <span slot="title">策略管理</span>
    </el-menu-item>
    <el-menu-item index="/order">
      <i class="el-icon-document"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>
    <el-menu-item index="/report">
      <i class="el-icon-setting"></i>
      <span slot="title">对账统计</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  border: 0;
}
</style>
