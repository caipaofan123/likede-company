<template>
  <div class="mybutton">
    <el-button
      :disabled="disabled"
      type="primary"
      @click="clickFn"
      :icon="icon"
      :style="btnStyle"
      :class="{ disabled: disabled }"
    >
      <slot name="lastIcon"></slot>
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "MyButton",
  data() {
    return {};
  },
  props: {
    icon: {
      type: String,
    },
    btnStyle: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  methods: {
    clickFn() {
      this.$emit("click");
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.mybutton {
  margin-right: 10px;
  .el-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 36px;
    border: none;
  }
}
::v-deep .el-button {
  i {
    font-size: 18px;
    margin-right: 2px;
  }
}
.disabled {
  opacity: 0.3;
}
</style>
