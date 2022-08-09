<template>
  <el-dialog
    title="批量策略管理"
    :visible="policyVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form :model="formData" ref="form" label-width="100px">
      <el-form-item label="选择策略：" prop="name">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.policyId"
            :label="item.policyName"
            :value="item.policyId"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSave()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getPolicy,applyPolicy} from '@/api/vm'
export default {
  data() {
    return {
      formData: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  props: {
    policyVisible: {
      type: Boolean,
      required: true,
    },
    innerCodeList:{
        type: String,
    }
  },
  created() {
    this.getPolicy()
  },

  methods: {
    handleClose() {
      this.$emit("close");
    },
    async getPolicy(){
        const res = await getPolicy()
        console.log(res);
        this.options=res.data
    },
    async onSave(){
        const data={
            innerCodeList:[this.innerCodeList],
            policyId:this.value
        }
        const res = await applyPolicy(data)
        console.log(res);
        this.handleClose()
    }
  },
};
</script>

<style scoped>
.el-select{
    width: 350px;
}
</style>
