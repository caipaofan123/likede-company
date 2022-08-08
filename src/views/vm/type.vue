<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" label-width="100px">
        <el-form-item label="设备编号：">
          <el-input></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column prop="name" label="型号名称" width="120">
      </el-table-column>
      <el-table-column prop="model" label="型号编码" width="120">
      </el-table-column>
      <el-table-column label="设备图片" width="120">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.image"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="vmRow" label="货道行" width="120">
      </el-table-column>
      <el-table-column prop="vmCol" label="货道列" width="120">
      </el-table-column>
      <el-table-column prop="channelMaxCapacity" label="设备容量" width="120">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <vmEdit
      :dialogVisible="dialogVisible"
      @close="onClose"
      :dataInfo="dataInfo"
    ></vmEdit>
  </div>
</template>

<script>
import vmEdit from "./components/vm-edit.vue";
import { getVms } from "@/api/vm";
export default {
  data() {
    return {
      form: {},
      tableData: [],
      dialogVisible: false,
      // currentIndex:1,
      dataInfo: {},
    };
  },
  components: {
    vmEdit,
  },
  created() {
    this.getVms();
  },

  methods: {
    async getVms() {
      const res = await getVms();
      // console.log(res);
      this.tableData = res.data.currentPageRecords;
    },
    handleEdit(index, data) {
      this.dialogVisible = true;
      this.dataInfo = data;
      // console.log(this.dataInfo);
    },
    handleDelete() {},
    onClose() {
      this.dialogVisible = false;
    },
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
  width: 1480px;
}
.el-form {
  display: flex;
}
.el-form-item {
  width: 300px;
}
</style>
