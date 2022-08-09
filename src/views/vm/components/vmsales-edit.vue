<template>
  <el-dialog
    title="设备详情"
    :visible="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
  <b>商品销售量{{dataCount.orderCount}} 个</b>
    
    <br>
    <b>销售额{{dataCount.orderAmount}} 元</b>
    
    <br> 
    <b>补货次数{{dataCount.supplyCount}} 次 </b>
    
    <br>
    <b>维修次数{{dataCount.repairCount}} 次</b>
    
    <hr>
    商品销量：
    <hr />
    <div v-for="(item, index) in dataInfo" :key="index">
      <b>{{ item.skuName }}</b
      >:{{ item.count }}
    </div>
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
      type: Array,
      required: true,
    },
    dataCount: {
      type: Object,
      required: true,
    },
  },
  created() {},
  // watch: {
  //   dataInfo: {
  //     handler() {},
  //     deep: true,
  //   },
  //   dataCount:{
  //     handler() {},
  //     deep: true,
  //   },
  // },
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
