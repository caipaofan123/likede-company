<template>
  <div>
    <!-- 搜索栏 -->
    <div class="search">
      <el-form label-width="80px">
        <headInput :label="labelName"></headInput>
        <el-form-item>
          <headBtn
            :btnType="headBtnType"
            :btnLabel="headBtnLabelName"
            :btnIcon="headBtnIcon"
          ></headBtn>
        </el-form-item>
      </el-form>
    </div>
    <!-- 结果栏 -->
    <div class="result">
      <div>
        <headBtn
          :btnType="mainBtnType"
          :btnLabel="mainBtnLabelName"
          :btnIcon="mainBtnIcon"
          @addRegionBtn="addRegion"
        ></headBtn>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" ref="getIndex">
          </el-table-column>
          <el-table-column prop="name" label="区域名称" width="450">
          </el-table-column>
          <el-table-column prop="nodeCount" label="点位数" width="450">
          </el-table-column>
          <el-table-column prop="remark" label="备注说明" width="450">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small"> 查看详情 </el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="addRegion(scope)"
              >
                修改
              </el-button>
              <el-button
                @click.native.prevent="
                  deleteRow(scope.$index, tableData, scope)
                "
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @prev-click="getRegionList(pageIndex - 1)"
          @next-click="getRegionList(pageIndex + 1)"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 新增按钮触发的对话框 -->
    <el-dialog
      title="新增区域"
      ref="titleName"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="区域名称：">
          <el-input
            v-model="form.regionName"
            autocomplete="off"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
            :label-width="formLabelWidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注说明：">
          <el-input
            v-model="form.remark"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 3 }"
            placeholder="请输入备注(不超过40字)"
            maxlength="40"
            show-word-limit
            :label-width="formLabelWidth"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headInput from "./components/headInput.vue";
import headBtn from "./components/headBtn.vue";
import {
  getRegionListApi,
  addRegionApi,
  delRegionApi,
} from "@/api/region/regionList";
export default {
  data() {
    return {
      labelName: "区域搜索:",
      headBtnType: "primary",
      mainBtnType: "warning",
      headBtnLabelName: "查询",
      mainBtnLabelName: "新增",
      headBtnIcon: "el-icon-search",
      mainBtnIcon: "el-icon-circle-plus-outline",
      regionListData: {}, // 拿到的所有数据
      tableData: [], // table表格用到的数据
      pageIndex: "",
      pageSize: "",
      name: "",
      // 切换页码请求参数
      totalCount: 0,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        regionName: "",
        remark: "",
      },
    };
  },
  components: {
    headInput,
    headBtn,
  },
  created() {
    this.getRegionList();
  },
  methods: {
    async getRegionList(index) {
      this.pageIndex = index;
      const { data } = await getRegionListApi(this.pageIndex, this.pageSize);
      console.log(data);
      // 拿到的所有数据
      this.regionListData = data;
      // table表格用到的数据
      this.tableData = data.currentPageRecords;
      this.totalCount = Number(data.totalCount);
      // 切换页码请求参数
      this.pageSize = Number(data.pageSize);
      this.pageIndex = Number(data.pageIndex);
    },
    addRegion(scope) {
      console.log(scope);
      this.dialogFormVisible = true;
    }, // 显示添加弹窗
    async addConfirm() {
      this.dialogFormVisible = false;
      const res = await addRegionApi(this.form);
      this.getRegionList(this.pageIndex);
    }, // 确认添加

    async deleteRow(index, rows, scope) {
      try {
        this.tableData = this.tableData.filter((item) => {
          return item.id !== scope.row.id;
        });
        const res = await delRegionApi(scope.row.id);
      } catch (error) {
        console.log(error);
      }
    },
    aaa() {
      console.log(888);
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  display: flex;
  height: 64px;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  .el-form {
    display: flex;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .cell {
    padding-left: 0px;
    .el-button {
      border: 0px solid #f5f7fa;
    }
    .btn1 {
      color: #5f84ff;
    }
    .btn2 {
      color: #ff5a5a;
    }
    button {
      border: #fff;
      background: #fff;
    }
  }
  .block {
    text-align: center;
    margin-top: 15px;
  }
}
</style>
