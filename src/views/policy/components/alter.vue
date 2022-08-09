<template>
  <el-dialog @close="onclose" title="新增工单" :visible="visible" width="40%">
    <el-row :gutter="20" justify="center">
      <el-form ref="form" label-width="80px" :rules="rules">
        <el-form-item prop="policyName" label="策略名称">
          <el-input
            v-model="roleFome.policyName"
            placeholder="请输入策略内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="discount" label="策略方案">
          <el-input-number
            placeholder="请输入策略方案"
            class="elinput"
            v-model="roleFome.discount"
            controls-position="right"
            :min="1"
            :max="10"
            style="width: 100%"
          >
            ></el-input-number
          >
        </el-form-item>
      </el-form>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click.native="onAffirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { CreatePolicyApi, addPolicyApi } from "@/api/policy";
export default {
  name: "alter",
  data() {
    return {
      roleFome: {
        discount: "",
        policyName: "",
      },
      policyId: "",

      rules: {
        policyName: [
          { required: true, message: "请输入优惠折扣", trigger: "blur" },
        ],
        discount: [
          { required: true, message: "请输入折扣方案", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    amend: {
      type: [String, Number, Object],
      required: true,
    },
  },
  components: {},
  methods: {
    // 父组件refs传过来的值
    alter(val) {
      // console.log(val);
      this.roleFome.policyName = val.policyName;
      this.roleFome.discount = val.discount;
      this.roleFome.policyId = val.policyId;
    },

    onclose() {
      // 关闭弹窗
      this.$emit("update:visible", false);
      this.$refs.form.resetFields();
      // 清空输入框
      this.roleFome = {
        discount: "",
        policyName: "",
      };
    },
    // 点击确认
    async onAffirm() {
      try {
        if (this.roleFome.policyId) {
          // 有ID编辑
          await CreatePolicyApi(
            (this.data = this.roleFome),
            (this.policyName = this.roleFome.policyName),
            (this.discount = this.roleFome.discount)
          );
        } else {
          //新增业务
          await addPolicyApi(this.roleFome);
        }

        this.$parent.gePolicy();
        this.$parent.$message.success("修改成功");
        this.$parent.visAlter = false;
        // 重新拉取数据
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {},
  updated() {},
  mounted() {},
  filters: {},
  computed: {},
  watch: {},
};
</script>
<style scoped>
.el-col-5 {
  width: 20.83333%;
  padding-top: 5px;
}
</style>
