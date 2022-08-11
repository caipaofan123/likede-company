<template>
  <div>
    <div class="input">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="工单编号">
          <el-input v-model="formInline.user" placeholder="工单编号"></el-input>
        </el-form-item>
        <el-form-item label="工单状态">
          <el-select v-model="formInline.region" placeholder="工单状态">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div class="button">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-plus"
            @click="dialogTableVisible = true"
            >新建</el-button
          >
        </el-col>
      </el-row>
    </div>
    <!-- 工单信息 -->
    <div class="toble">
      <!-- 表格数据 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="taskCode" label="工单编号" width="120" />
        <el-table-column prop="innerCode" label="设备编号" width="120" />
        <el-table-column
          prop="taskType.typeName"
          label="工单类型"
          width="120"
        />
        <el-table-column
          prop="createType"
          label="工单方式"
          :formatter="tasCreateType"
          width="120"
        />
        <el-table-column
          prop="taskStatusTypeEntity.statusId"
          label="工单状态"
          :formatter="tasStatusId"
          width="100"
        />
        <el-table-column prop="userName" label="运营人员" width="120" />
        <el-table-column prop="updateTime" label="创建日期" width="160" />
        <el-table-column prop="name" label="操作" width="120">
          <template slot-scope="{ row }">
            <el-button @click.native="handleClick(row)" type="text" size="small"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 新建弹框 -->
      <el-dialog
        @close="onclose"
        title="新增工单"
        :visible.sync="dialogTableVisible"
        width="40%"
      >
        <el-form ref="form" label-width="100px">
          <!-- 设备编号 -->
          <el-form-item label="设备编号">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <!-- 工单类型 -->
          <el-form-item label="工单类型">
            <el-select
              style="width: 100%"
              placeholder="请选择活动区域"
              v-model="staff"
            >
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <!-- 补货数量 -->
          <el-row :gutter="20" type="flex" justify="space-around">
            <el-col :span="10"></el-col>
          </el-row>
          <el-form-item label="运营人员">
            <el-select
              style="width: 100%"
              placeholder="请选择活动区域"
              v-model="operator"
            >
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              style="width: 100%"
              placeholder="1-300个字符"
              type="textarea"
              :rows="3"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onclose">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看详情弹框 -->
      <el-dialog
        title="工单详情"
        :visible.sync="dialogVisibles"
        width="630px"
        custom-class="el-dialog1"
        @close="onclose"
      >
        <div class="top">
          <el-button
            @click="$emit('changeVis')"
            class="cancel"
            icon="el-icon-close"
          ></el-button>
        </div>
        <div class="body">
          <div class="body-top">
            <img
              src="../../assets/images/9946c6e60f58eadfdf1bc9fe9cb1462.png"
              alt=""
            />
            <span>取消</span>
            <img
              src="../../assets/images/ccbcb46d4abca50cd216cce8b9cace7.png"
              alt=""
            />
          </div>
          <el-form>
            <el-row>
              <el-col :span="12">
                <el-form-item label="设备编号:">
                  <span>{{ DetailsFrom.innerCode }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建日期:">
                  <span>{{ DetailsFrom.createTime }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="运营人员:">
                  <span>{{ DetailsFrom.userName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工单类型:">
                  <span>自动</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工单方式:">
                  <span>{{
                    DetailsFrom.createType == 0 ? "自动" : "手动"
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注:">
                  <span>{{ DetailsFrom.desc }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="rebuild" @click="dialogTableVisible = true"
            >重新创建</el-button
          >
        </div>
      </el-dialog>

      <!-- 分页 不需要改-->
      <pagenation
        :listIsShow="this.lastDisabled && this.rightDisabled"
        :taskList="regionData"
        v-if="regionData.totalCount"
        :lastDisabled="lastDisabled"
        :rightDisabled="rightDisabled"
        @lastPage="getLastTaskService"
        @nextPage="getNextTaskService"
      />
    </div>
  </div>
</template>
<script>
import pagenation from "./components/pagination-new.vue";
import { searchTasks } from "@/api/task";
import { repairOperationApi, getOperationApi } from "@/api/operation";
export default {
  data() {
    return {
      regionData: {}, //列表数据，页数等
      // 控制页数
      params: {
        pageIndex: 1,
        pageSize: 10,
        isRepair: true, //控制
      },
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      creation: [], // 接收每一行数据
      dialogVisible: true,
      operator: "",
      staff: "",
      dialogTableVisible: false,
      innerCode: this.innerCode,
      dialogVisibles: false,
      // 查看详情数据
      DetailsFrom: [],
    };
  },
  methods: {
    //获取全部工单列表
    tasCreateType(row) {
      return row.createType === "1" ? "自动" : "手动";
    },
    tasStatusId(row, column, index) {
      return ["待办", "进行", "取消", "完成"][index];
    },
    // tasStatypeName(row, column, index) {
    //   return ["投放工单", "补货工单", "维修工单", "撤机工单"][index];
    // },
    //获取全部工单列表
    async searchTasks() {
      const res = await searchTasks(this.params);
      // console.log(res);
      this.tableData = res.data.currentPageRecords;
      this.regionData = res.data; //获取整个对象
      // console.log(this.tableData);
    },
    // 关闭弹窗
    onclose() {
      this.$emit("update:visible", false);
    },

    // 创建工单
    async handleClick(row) {
      this.creation = row;
      const res = await getOperationApi(row.taskId);
      this.DetailsFrom = res.data;
      console.log(res.data);

      this.dialogVisibles = true;
    },
    onclose() {
      this.$emit("update:visible", false);
    },
    // 加载下一页
    async getNextTaskService() {
      this.params.pageIndex++;
      this.searchTasks(); //调用渲染列表
    },
    // 加载上一页
    async getLastTaskService() {
      this.params.pageIndex--;
      this.searchTasks();
    },
  },

  components: {
    pagenation,
  },
  created() {
    this.searchTasks();
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
};
</script>
<style scoped lang="scss">
.box {
  background-color: #ccc;
}
.el-button--warning {
  background-color: #fc6f2a;
}
.btn {
  background-color: #fbf4f0;
  border-color: #fbf4f0;
  color: #555;
}
.el-table--border {
  margin-top: 20px;
}
.eltable {
  background-color: pink !important;
}
.input {
  height: 70px;
  background-color: #fff;
  padding: 15px 10px;
}
.button {
  background-color: #fff;
  margin-top: 10px;
  padding: 15px 10px;
  height: 70px;
}
.toble {
  height: 1000px;
  background-color: #fff;
}
/* .el-card.is-always-shadow {
  -webkit-box-shadow: 0 2px 10px 0 rgb(0 0 0 / 6%);
} */
.button {
  color: #5f84ff;
}
.top {
  .cancel {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
  }
}
.body {
  .body-top {
    display: flex;
    align-items: center;
    height: 54px;
    margin-bottom: 25px;
    background-color: hsla(0, 0%, 92.5%, 0.39);
    span {
      flex: 1;
      margin-left: 16px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
.dialog-footer {
  padding-top: 0;
  text-align: center;
  .rebuild {
    width: 80px !important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0 !important;
    border: none;
    color: #655b56 !important;
  }
}
::v-deep.el-dialog {
  border-radius: 10px;
}
.el-table {
  &:nth-child(1) {
    background: #f0f9eb !important;
  }
}
.el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  .el-dialog__header {
    padding: 20px;
    padding-bottom: 10px;
  }
  .el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;
    font-size: 14px;
    word-break: break-all;
  }
}
</style>
