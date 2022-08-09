<template>
  <div class="user-container">
    <el-card class="box-card search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="人员搜索：">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" icon="el-icon-search"
            >查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-button
        icon="el-icon-circle-plus-outline"
        class="established-button"
        @click="addDialog"
        >新建</el-button
      >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="80"
        >
        </el-table-column>
        <el-table-column prop="userName" label="人员名称" width="225">
        </el-table-column>
        <el-table-column prop="regionName" label="归属区域" width="225">
        </el-table-column>
        <el-table-column prop="role.roleName" label="角色" width="225">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话" width="225">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick" type="text" size="small">
              修改
            </el-button>
            <el-button type="text" size="small" class="del" @click="del"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <AddPeople
      :visible.sync="dialogVisible"
      :finishedAdd="getPeopleList"
      ref="addPeople"
    ></AddPeople>
  </div>
</template>

<script>
import { getPeopleList } from "@/api/people";
import AddPeople from "./components/addPeople.vue";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      dialogVisible: false,
    };
  },
  components: {
    AddPeople,
  },

  created() {
    this.getPeopleList();
  },

  methods: {
    //表格排序（表格自带）
    indexMethod(index) {
      return index + 1;
    },
    //新建
    addDialog() {
      this.dialogVisible = true;
    },
    //查询
    onSubmit() {
      // console.log("submit!");
    },
    //修改
    handleClick() {
      this.dialogVisible = true;
      this.$refs.addPeople.getPeopleById();
    },
    //删除
    del() {
      console.log(111);
    },

    //刷新渲染数据
    async getPeopleList(val) {
      const res = await getPeopleList(val);
      // console.log(res);
      this.tableData = res.data.currentPageRecords;
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  // margin-bottom: 20px;
  // padding-left: 17px;
  width: 100%;
  height: 100px;
  line-height: 64px;
  background-color: #fff;
  ::v-deep .el-form-item__content {
    line-height: 64px;
    .el-button {
      padding: 10px 20px;
      width: 80px;
      height: 36px;
      background-color: #5f84ff;
    }
  }
}
.box-card {
  .established-button {
    background-color: #ff6625;
    color: #fff;
  }
}
.del {
  color: red;
}
</style>
