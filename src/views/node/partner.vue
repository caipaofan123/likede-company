<template>
  <div>
    <!-- 搜索栏 -->
    <div class="search">
      <el-form label-width="120px">
        <el-form-item :label="labelName">
          <el-input v-model="headIptVal" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native="getPartnerList"
            icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 结果栏 -->
    <div class="result">
      <el-button
        @click.native="addPartner"
        type="warning"
        icon="el-icon-circle-plus-outline"
        >新增</el-button
      >
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            :index="indexMethod"
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column prop="name" label="合作商名称" width="220">
          </el-table-column>
          <el-table-column prop="account" label="账号" width="220">
          </el-table-column>
          <el-table-column prop="vmCount" label="设备数量" width="220">
          </el-table-column>
          <el-table-column prop="ratio" label="分成比例" width="220">
          </el-table-column>
          <el-table-column prop="contact" label="联系人" width="220">
          </el-table-column>
          <el-table-column prop="mobile" label="联系电话" width="220">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="resetPwdBtn(scope)">
                重置密码
              </el-button>
              <el-button type="text" size="small" @click="checkDetail(scope)">
                查看详情
              </el-button>
              <el-button type="text" size="small" @click="changePartner(scope)">
                修改
              </el-button>
              <el-button type="text" size="small" @click="deletePartner(scope)">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新增按钮触发的对话框 -->
    <el-dialog :title="titleName" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="合作商名称：">
          <el-input
            autocomplete="off"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
            label-width="80px"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input
            autocomplete="off"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
            label-width="80px"
            v-model="form.contact"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input
            autocomplete="off"
            placeholder="请输入"
            maxlength="11"
            show-word-limit
            label-width="80px"
            v-model="form.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item label="分成比例(%)：">
          <el-input-number
            v-model="form.ratio"
            placeholder="请输入"
            controls-position="right"
            :min="1"
            :max="100"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input
            autocomplete="off"
            placeholder="请输入"
            maxlength="18"
            show-word-limit
            label-width="80px"
            v-model="form.account"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            show-password
            autocomplete="off"
            placeholder="请输入"
            label-width="80px"
            v-model="form.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改按钮触发的对话框 -->
    <el-dialog
      :title="titleName"
      :visible.sync="dialogFormVisible1"
      width="30%"
    >
      <el-form :model="form">
        <el-form-item label="合作商名称：">
          <el-input
            autocomplete="off"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
            label-width="80px"
            v-model="form.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input
            autocomplete="off"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
            label-width="80px"
            v-model="form.contact"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input
            autocomplete="off"
            placeholder="请输入"
            maxlength="11"
            show-word-limit
            label-width="80px"
            v-model="form.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item label="分成比例(%)：">
          <el-input-number
            v-model="form.ratio"
            placeholder="请输入"
            controls-position="right"
            :min="1"
            :max="100"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看详情触发的对话框 -->
    <el-dialog title="收货地址" :visible.sync="detailDialogShow" width="30%">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作商名称" :label-width="formLabelWidth">
              <div>{{ form.name }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" :label-width="formLabelWidth">
              <div>{{ form.contact }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <div>{{ form.mobile }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分成比例" :label-width="formLabelWidth">
              <div>{{ form.ratio }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getPartnerListApi,
  addPartnerApi,
  changePartnerApi,
  resetPwdApi,
  deletePartnerApi,
} from "@/api/partner/partnerList";
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      detailDialogShow: false,
      titleName: "",
      formLabelWidth: "120px",
      headIptVal: "",
      labelName: "合作商搜索:",
      pageIndex: "",
      pageSize: 10,
      id: "", // 合作商id
      form: {
        name: "", // 合作商名称
        account: "",
        password: "",
        ratio: "",
        contact: "",
        mobile: "",
      },
      tableData: [], // 数据列表
    };
  },

  created() {
    this.getPartnerList();
  },

  methods: {
    indexMethod(index) {
      return index + 1 + this.pageIndex * 10;
    }, // 表格index
    async getPartnerList() {
      this.name = this.headIptVal;
      const res = await getPartnerListApi(
        this.pageIndex,
        this.pageSize,
        this.name
      );
      this.tableData = res.data.currentPageRecords;
    },
    addPartner() {
      this.form.name = "";
      this.form.account = "";
      this.form.ratio = "";
      this.form.contact = "";
      this.form.mobile = "";
      this.dialogFormVisible = true;
      this.titleName = "新增合作商";
    }, // 新增按钮
    async addConfirm() {
      const res = await addPartnerApi(this.form);
      this.dialogFormVisible = false;
      this.getPartnerList();
    }, //确认新增合作商
    async resetPwdBtn(scope) {
      console.log(scope);
      this.$confirm("确定要重置合作商密码吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "重置成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置",
          });
        });
    }, //重置密码
    checkDetail(scope) {
      this.detailDialogShow = true;
      this.form.name = scope.row.name;
      this.form.ratio = scope.row.ratio;
      this.form.contact = scope.row.contact;
      this.form.mobile = scope.row.mobile;
    }, // 查看详情
    changePartner(scope) {
      this.titleName = "修改合作商";
      this.dialogFormVisible1 = true;
      console.log(scope);
      this.form.name = scope.row.name;
      this.form.ratio = scope.row.ratio;
      this.form.contact = scope.row.contact;
      this.form.mobile = scope.row.mobile;
      this.id = scope.row.id;
    }, //修改按钮
    async changeConfirm() {
      const res = await changePartnerApi(this.form, this.id);
      console.log(res);
      this.dialogFormVisible1 = false;
      this.getPartnerList();
    }, //确认修改合作商
    async deletePartner(scope) {
      this.id = scope.row.id;
      const res = await deletePartnerApi(this.id);
      console.log(res);
      this.getPartnerList();
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
