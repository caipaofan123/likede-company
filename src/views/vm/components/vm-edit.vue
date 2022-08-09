<template>
  <el-dialog
    title="修改设备类型"
    :visible="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="型号名称" prop="name">
        <el-input
          placeholder="请输入型号名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="型号编码" prop="model">
        <el-input
          placeholder="请输入型号编码"
          v-model="formData.model"
        ></el-input>
      </el-form-item>
      <el-form-item label="货道行数" prop="vmRow">
        <el-input-number
          style="width: 100%"
          v-model="formData.vmRow"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道列数" prop="vmCol">
        <el-input-number
          style="width: 100%"
          v-model="formData.vmCol"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道容量" prop="channelMaxCapacity">
        <el-input-number
          style="width: 100%"
          v-model="formData.channelMaxCapacity"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="设备图片" prop="code">
        <el-image
          style="width: 100px; height: 100px"
          :src="formData.image"
        ></el-image>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSave(formData)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editVms } from "@/api/vm";
export default {
  data() {
    return {
      formData: {
        vmName: "",
        vmCode: "",
        vmRowNum: 1,
        vmColNum: 1,
        vmMax: 1,
      },
      formRules: {},
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    dataInfo: {
      type: Object,
      required: true,
    },
  },
  created() {},
  watch: {
    dataInfo: {
      handler() {
        this.formData = this.dataInfo;
        console.log(this.formData);
      },
      deep: true,
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    async onSave(data) {
        console.log(data);
      const res = await editVms(data);
      console.log(res);
    //   this.handleClose()
    //   this.$parent.getVms()
    },
  },
};
</script>

<style scoped></style>
