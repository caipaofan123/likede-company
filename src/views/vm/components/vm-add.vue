<template>
  <el-dialog
    :append-to-body="true"
    title="选择商品"
    :visible="Visible"
    width="50%"
    :before-close="handleClose"
  >
    
      <el-form ref="form" :form="formData" label-width="90px">
        <el-form-item label="商品名称">
          <el-input v-model="formData.skuName"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search" class="btn" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    

    <div style="display: inline-block; border: 1px solid blue"
    v-for="(item,index) in skuList" :key="index" @click='check(item,index)'
    >
      
      <!-- <div><b>{{item.sku?item.sku:123}}</b></div> -->
     <i class="el-icon-success" v-if="item.isChecked"></i>
      <el-image
        style="width: 100px; height: 100px"
        :src="item.skuImage"
      ></el-image>
      <p style="text-align: center">{{item.skuName}}</p>
      
    </div>
    <el-pagination layout="prev, next" :total="totalCount"
     @current-change="handleCurrentChange"
    > </el-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSave()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editVms ,getSku,editSku} from "@/api/vm";
export default {
  data() {
    return {
      formData:{
        skuName:''
      },
      skuList:[],
      totalCount:30,
      pageInfo:{},
      skuId:'',
      // channelList:{}
    };
  },
  props: {
    Visible: {
      type: Boolean,
      required: true,
    },
    channelCode:{
      type: String,
      required: true,
    },
    innerCode:{
      type: String,
      required: true,
    },
    channelList:{
      type: Array,
      required: true,
    },
    // index:{
    //   type: Number
    // }
  },
  // computed:{
  //   sku(){
  //       const {sku} = item
  //       return sku.skuImage
  //   }
  // },
  created() {
    this.getSku()
  },
  
  methods: {
    handleClose() {
      this.$emit("close");
    },
    async onSave() {
      // const res = await editSku(this.innerCode,this.channelList,this.channelCode,this.skuId)
      const res = await editSku(this.innerCode,this.channelList)
      console.log(res);
      this.handleClose()
      
      
    },
    async getSku(){
      const res = await getSku()
      console.log(res);
      this.skuList=res.data.currentPageRecords
      this.skuList.forEach(item=>item.isChecked=false)
      // console.log(this.skuList);
      this.totalCount=parseInt(res.data.totalCount)
    },
    async search(){
      const res = await getSku('',this.formData.skuName)
      console.log(res);
      this.skuList = res.data.currentPageRecords;
    },
    async handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      const res=await getSku(val);
      this.skuList = res.data.currentPageRecords;
      // this.skuList.forEach(item=>item.isChecked=false)
      this.pageInfo.pageIndex=val
    },
    check(item,index){
      this.skuList.forEach(item=>item.isChecked=false)
      item.isChecked=!item.isChecked
      this.$set(this.skuList,index,item)
      this.editData=item
      this.channelList.skuId=item.skuId
      this.channelList.channelCode=this.channelCode
    }
  },
};
</script>

<style scoped>
.el-form{
  display: flex
}
.el-input{
  width: 200px;
}

</style>
