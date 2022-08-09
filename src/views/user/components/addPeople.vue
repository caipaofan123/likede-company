<template>
  <el-dialog
    @close="outsideClose"
    title="新增人员"
    :visible="visible"
    width="50%"
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="人员名称：" prop="userName">
        <el-input placeholder="请选择" v-model="formData.userName"></el-input>
      </el-form-item>

      <el-form-item label="角色：" prop="roleId">
        <el-select placeholder="请选择" v-model="roleName" style="width: 100%">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :value="item.roleName"
            :label="item.roleName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="联系电话：" prop="mobile">
        <el-input placeholder="请选择" v-model="formData.mobile"></el-input>
      </el-form-item>

      <el-form-item label="负责区域：" prop="regionName">
        <el-select
          placeholder="请选择"
          v-model="formData.regionId"
          style="width: 100%"
        >
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :value="item.name"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="头像：" prop="image">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.image" :src="formData.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <template slot="tip"
            >支持扩展名：jpg、png，文件不得大于100kb
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态：" prop="status">
        <el-checkbox
          v-model="formData.status"
          value="1"
          label="是否启用"
        ></el-checkbox>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="outsideClose">取 消</el-button>
      <el-button type="primary" class="established-button">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPeopleRoleList, getAreaList, getImageUrlAPI } from "@/api/people";
export default {
  data() {
    return {
      // imageUrl: "",
      checked: true,
      formData: {
        userName: "",
        roleId: "",
        mobile: "",
        regionId: "", //所属区域Id
        regionName: "", //所属区域名称
        status: false,
        image: "",
      },
      formRules: {
        userName: [{ required: true, message: "请输入", trigger: "blur" }],
        roleId: [{ required: true, message: "请输入", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        regionName: [{ required: true, message: "请输入", trigger: "blur" }],
        image: [{ required: true, message: "请上传", trigger: "blur" }],
      },
      roleList: [], //返回的角色列表
      areaList: [], //返回的区域列表
      roleName: "", //选择的角色名称
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    roleName(newVal, oldVal) {
      if (newVal === "运营员") {
        this.formData.roleId = 2;
      } else if (newVal === "维修员") {
        this.formData.roleId = 3;
      }
    },
  },
  methods: {
    //图片转址
    async handleAvatarSuccess(res, file) {
      const formData = new FormData();
      formData.append("fileName", file.raw);
      const { data } = await getImageUrlAPI(formData);
      this.formData.image = data;
    },
    //图片限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //角色列表
    async getPeopleRoleList() {
      const res = await getPeopleRoleList();
      this.roleList = res.data;
      // console.log(res);
    },
    //区域列表
    async getAreaList() {
      const { data } = await getAreaList({ pageSize: 50 });
      this.areaList = data.currentPageRecords;
      // console.log(data);
    },
    outsideClose() {
      this.$emit("update:visible", false);
    },
  },
  created() {
    this.getPeopleRoleList();
    this.getAreaList();
  },
};
</script>

<style scoped>
.established-button {
  background-color: #ff6625;
  color: #fff;
}
/* 图片样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
