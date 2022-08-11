<template>
  <el-dialog
  :append-to-body="true"
    title="货道设置"
    :visible="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <p>
      货道行数:{{ type.type ? type.type.vmRow : 0 }} 货道列数:{{
        type.type ? type.type.vmCol : 0
      }}
      货道容量（个）:{{ type.type ? type.type.channelMaxCapacity : 0 }}
    </p>
    <div
      v-for="(item, index) in channelList"
      :key="index"
      style="display: inline-block; border: 1px solid blue"
    >
      <span>{{ item.channelCode }}</span>
      <!-- <div><b>{{item.sku?item.sku:123}}</b></div> -->

      <el-image
        style="width: 100px; height: 100px"
        :src="item.sku ? item.sku.skuImage : '~@/assets/images/123.jpg'"
      ></el-image>
      <p style="text-align: center">
        {{ item.sku ? item.sku.skuName : "暂无商品" }}
      </p>
      <div>
        <el-button size="mini" style="color: skyblue" @click='add(item,index)'>添加</el-button>
        <el-button size="mini" style="color: red">删除</el-button>
      </div>
    </div>


    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSave(formData)">确 定</el-button>
    </span>
    <vmadd :Visible="Visible" @close="onClose" :channelCode='channelCode' :innerCode='innerCode' :channelList='channelList'  ></vmadd>
  </el-dialog>
</template>

<script>
import vmadd from "./vm-add.vue";
import { editVms } from "@/api/vm";
export default {
  data() {
    return {
      Visible: false,
      channelCode:'',
      innerCode:'',
      // index:0
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
    channelList: {
      type: Array,
      required: true,
    },
    type: {
      type: Object,
      required: true,
    }
    
  },
  // computed:{
  //   sku(){
  //       const {sku} = item
  //       return sku.skuImage
  //   }
  // },
  components: {
    vmadd,
  },
  created() {},
  //   watch: {
  //     dataInfo: {
  //       handler() {
  //         this.formData = this.dataInfo;
  //         console.log(this.formData);
  //       },
  //       deep: true,
  //     },
  //   },
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
    onClose() {
      this.Visible = false;
    },
    add(item,index){
       this.Visible=true
       this.channelCode=item.channelCode
      //  this.skuId=item.sku?item.sku.skuId:null
      this.innerCode=item.innerCode
     
      
    }
  },
};
</script>

<style scoped></style>
