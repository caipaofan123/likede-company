<template>
  <el-dialog
    title="修改设备"
    :visible="editvmVisible"
    width="50%"
    :before-close="handleClose"
  >
    <h4>机器编号：{{ vmdata.innerCode }}</h4>
    <h4>供货时间：{{ vmdata.lastSupplyTime }}</h4>
    <h4>设备类型：{{ vmdata.type?vmdata.type.name:null }}</h4>
    <h4>设备容量：{{ vmdata.type?vmdata.type.channelMaxCapacity:null }}</h4>
    <h4>
      设备点位：
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in nodelist"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </h4>
    <h4>合作商：{{ vmdata.node?vmdata.node.ownerName:null }}</h4>
    <h4>所属区域：{{ vmdata.node?vmdata.node.addr:null }}</h4>
    <h4>设备地址:{{ vmdata.node?vmdata.node.name:null }}</h4>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getNode,editNode} from '@/api/vm'
export default {
  data() {
    return {
      value:'',
      options:[]
    };
  },
  props: {
    editvmVisible: {
      type: Boolean,
    },
    tableData: {
      type: Array,
      required: true,
    },
    vmdata: {
      type: Object,
    },
    nodelist:{
      type: Array,
    }
  },
  created() {},

  methods: {
    handleClose() {
      this.$emit("close");
    },
    async onSave() {
       const res = await editNode(this.vmdata.node)
       console.log(res);
       this.handleClose()
       this.$parent.getStatus()
    },
  },
};
</script>

<style scoped></style>
