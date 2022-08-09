<template>
  <el-dialog @close="onclose" title="新增工单" :visible="visible" width="40%">
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
        <el-col :span="9">
          <div class="elclo">
            补货数量： <span class="el-icon-document"> 补货清单</span>
          </div>
        </el-col>
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
</template>
<script>
export default {
  data() {
    return {
      operator: "",
      staff: "",
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  components: {},
  methods: {
    onclose() {
      this.$emit("update:visible", false);
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
.elclo {
  font-weight: 700;
  margin-bottom: 10px;
}
.elclo span {
  font-weight: 400;
  color: #7d9bff;
}
</style>
