<template>
  <el-dialog @close="onclose" title="新增工单" :visible="visible" width="40%">
    <el-row :gutter="20" justify="center">
      <el-col :span="5">补货警告线：</el-col>
      <el-col :span="15">
        <el-input-number
          class="elinput"
          v-model="num"
          controls-position="right"
          :min="1"
          :max="10"
          style="width: 100%"
        >
          ></el-input-number
        >
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="getReplenish">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getOrderApi, getReplenishApi } from "@/api/task";
export default {
  data() {
    return {
      num: "",
      alertValue: "",
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    // list: {
    //   type: Number,
    //   required: true,
    // },
  },
  components: {},
  created() {
    // 调用补货预警值
    this.getOrder();
    // 自动补货工单阈值
    this.getReplenish();
  },
  methods: {
    async getOrder() {
      const res = await getOrderApi();
      console.log(res);
      // 把值赋给输入框
      this.num = res.data;
      // 关闭弹窗
    },
    onclose() {
      console.log("点击");
      this.$emit("update:visible", false);
    },
    // 自动补货工单阈值
    async getReplenish() {
      const data = await getReplenishApi({
        alertValue: data.alertValue,
      });
      console.log(res);
    },
  },
  updated() {},
  mounted() {},
  filters: {},
  computed: {},
  watch: {},
};
</script>
<style scoped>
/* .elinput {
  height: 35px !important;
} */
.el-col-5 {
  width: 20.83333%;
  padding-top: 5px;
}
</style>
