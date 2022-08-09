<template>
  <div class="user-container">
    <el-card class="box-card search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="人员搜索：">
          <el-input v-model="formInline" placeholder="请输入"></el-input>
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">
              修改
            </el-button>
            <el-button
              type="text"
              size="small"
              class="del"
              @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagenation
        :listIsShow="this.lastDisabled && this.rightDisabled"
        :taskList="regionData"
        v-if="regionData.totalCount"
        :lastDisabled="lastDisabled"
        :rightDisabled="rightDisabled"
        @lastPage="getLastTaskService"
        @nextPage="getNextTaskService"
      />
    </el-card>

    <AddPeople
      :visible.sync="dialogVisible"
      :finishedAdd="getPeopleList"
      ref="addPeople"
      :currentId="currentId"
    ></AddPeople>
  </div>
</template>

<script>
import pagenation from "./components/pagination-new.vue";
import { getPeopleList } from "@/api/people";
import AddPeople from "./components/addPeople.vue";
import { delPeopleAPI } from "@/api/people";
export default {
  data() {
    return {
      formInline: "",
      tableData: [],
      dialogVisible: false,
      currentId: "",
      regionData: {}, //列表数据，页数等
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    AddPeople,
    pagenation,
  },

  computed: {
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.regionData.pageIndex <= 1;
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return (
        this.regionData.pageIndex == Math.ceil(this.regionData.totalCount / 10)
      );
    },
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
    async onSubmit() {
      const res = await getPeopleList();
      console.log(res);
      this.tableData = res.data.currentPageRecords.filter((item) => {
        return item.userName === this.formInline;
      });
      console.log(this.tableData);
    },
    //修改
    handleClick(scope) {
      this.dialogVisible = true;
      this.$refs.addPeople.getPeopleById();
      // console.log(scope.id);
      this.currentId = scope.id;
    },
    //删除
    async del(scope) {
      try {
        await this.$confirm("此操作将删除该人员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        // console.log("确认删除");
        await delPeopleAPI(scope.id);
        this.$message.success("删除该人员成功");
        this.getPeopleList();
      } catch (error) {}
    },

    //刷新渲染数据
    async getPeopleList() {
      const res = await getPeopleList(this.params);
      console.log(res);
      this.tableData = res.data.currentPageRecords;
      this.regionData = res.data;
    },
    // 加载下一页
    async getNextTaskService() {
      this.params.pageIndex++;
      this.getPeopleList();
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.getPeopleList();
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
