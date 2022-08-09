<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :form='formData' label-width="100px">
        <el-form-item label="设备编号：">
          <el-input v-model='formData.innerCode'></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click='search' icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column ><el-checkbox ></el-checkbox> </el-table-column>
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column prop="innerCode" label="设备编号" width="120">
      </el-table-column>
      <el-table-column prop="type.name" label="设备型号" width="120">
      </el-table-column>
      <el-table-column
        prop="node.name"
        label="详细地址"
        width="120"
      ></el-table-column>
      <el-table-column prop="ownerName" label="合作商" width="120">
      </el-table-column>
      <el-table-column  label="设备状态" width="120" :formatter='formatter'>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleChannelList(scope.$index, scope.row)">货道</el-button>
          <el-button size="mini" type="success" @click="handlePolicy(scope.$index, scope.row)">策略</el-button>
          <el-button size="mini" type="success" @click="handleEditVm(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="totalCount"
     @current-change="handleCurrentChange"
    > </el-pagination>
    
    <b style="color:red"><span>共{{pageInfo.totalCount}}条记录  第 {{pageInfo.pageIndex}}/{{pageInfo.totalPage}} 页</span></b>
    <vmchannel :dialogVisible='dialogVisible' @close='onClose' 
    :dataInfo='dataInfo' :dataCount='dataCount' :channelList='channelList' :type='type'></vmchannel>
    <vmpolicy :policyVisible="policyVisible" @close='onClose' :innerCodeList="innerCodeList"></vmpolicy>
    <vmeditvm :editvmVisible='editvmVisible' @close='onClose' :tableData="tableData" :vmdata="vmdata" :nodelist="nodelist"></vmeditvm>
  </div>
</template>

<script>
import {getNode,editNode} from '@/api/vm'
import vmeditvm from './components/vm-editvm.vue'
import vmpolicy from "./components/vm-policy.vue"
import vmchannel from './components/vm-channelList.vue'
import { getStatus ,getSales,getSupplyCount,getRepairCount,getOrderAmount,getOrderCount,getChannelList} from "@/api/vm";
export default {
  data() {
    return {
      tableData: [],
      totalCount:9,
      data:{},
      dialogVisible: false,
      policyVisible: false,
      editvmVisible: false,
      dataInfo:[],
      dataCount:{},
      pageInfo:{},
      formData:{
        innerCode:''
      },
      innerCodeList:'',
      channelList:[],
      type:{},
      vmdata:{},
      nodelist:[]
    };
  },
  components:{
    vmchannel,
    vmpolicy,
    vmeditvm
  },
  created() {
    this.getStatus();
  },

  methods: {
    async getStatus() {
      const res = await getStatus();
      console.log(res);
      this.totalCount=parseInt(res.data.totalCount)
      // console.log(this.totalCount);
      this.tableData = res.data.currentPageRecords;
      this.pageInfo=res.data
      console.log(this.tableData);
    },
    async handleEdit(index, data){
       this.dialogVisible=true
      this.dataCount.orderCount=(await getOrderCount(data.innerCode,'2020-01-01 00:00:00','2022-08-08 00:00:00')).data
      console.log(this.dataCount.orderCount);
      this.dataCount.orderAmount=(await getOrderAmount(data.innerCode,'2020-01-01 00:00:00','2022-08-08 00:00:00')).data
      console.log(this.dataCount.orderAmount);
      this.dataCount.repairCount=(await getRepairCount(data.innerCode,'2020-01-01','2022-08-08',data.vmType,data.nodeId,data.createUserId)).data
      console.log(this.dataCount.repairCount);
      this.dataCount.supplyCount=(await getSupplyCount(data.innerCode,'2020-01-01','2022-08-08',data.vmType,data.nodeId,data.createUserId)).data
      console.log(this.dataCount.supplyCount);
      console.log(this.dataCount);
      const res=await getSales(data.innerCode,'2020-01-01','2022-08-08',data.vmType,data.nodeId,data.createUserId)
      console.log(res);
      this.dataInfo=res.data
    },
    async handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      const res=await getStatus(val);
      this.tableData = res.data.currentPageRecords;
      this.pageInfo.pageIndex=val
    },
    async getSales(){
      const res=await getSales()
      console.log(res);
    },
    onClose(){
      this.dialogVisible=false
      this.policyVisible=false,
      this.editvmVisible=false
    },
    async search(){
        const res = await getStatus('',this.formData.innerCode)
        console.log(res);
        this.tableData=res.data.currentPageRecords
    },
    handleChannelList(index,data){
      this.dialogVisible=true
      this.getChannelList(data.innerCode)
      this.type=this.tableData[index]
    },
    async getChannelList(data){
      const res = await getChannelList(data)
      console.log(res);
      this.channelList=res.data

    },
    formatter(row,col){
      return ['未投放','运营','12','撤机'][row.vmStatus]
    },
    handlePolicy(index,data){
      this.policyVisible = true
      this.innerCodeList= data.innerCode
      console.log(this.innerCodeList);
    },
    async handleEditVm(index,data){
      this.editvmVisible=true
      this.vmdata=data
      const res = await getNode()
      console.log(res);
      this.nodelist=res.data.currentPageRecords
    }

  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 1480px;
}
.el-form {
  display: flex;
}
.el-form-item {
  width: 300px;
}
</style>
