import request from "@/utils/request";

export const getVms = (name) => {
  return request({
    url: "/api/vm-service/vmType/search",
    params:{
      name,
    }
  });
};

export const delVm = (typeId)=>{
  return request({
    url:'/api/vm-service/vmType/'+typeId,
    method: 'DELETE'
  })
}

export const editVms = (data) => {
  return request({
    url: "/api/vm-service/vmType/" + data.typeId,
    Headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    data,
  });
};

export const getStatus = (pageIndex, innerCode) => {
  return request({
    url: "/api/vm-service/vm/search",
    params: {
      pageIndex: pageIndex,
      innerCode: innerCode,
    },
  });
};

export const getSales = (
  innerCode,
  start,
  end,
  vmType,
  nodeId,
  createUserId
) => {
  return request({
    url: `/api/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
    data: {
      vmType,
      nodeId,
      createUserId,
    },
  });
};

export const getOrderCount = (innerCode, start, end) => {
  return request({
    url: `/api/order-service/report/orderCount`,
    params: {
      innerCode,
      start,
      end,
    },
  });
};

export const getOrderAmount = (innerCode, start, end) => {
  return request({
    url: `/api/order-service/report/orderAmount`,
    params: {
      innerCode,
      start,
      end,
    },
  });
};

export const getRepairCount = (
  innerCode,
  start,
  end,
  vmType,
  nodeId,
  createUserId
) => {
  return request({
    url: `/api/task-service/task/repairCount/${innerCode}/${start}/${end}`,
    data: {
      vmType,
      nodeId,
      createUserId,
    },
  });
};

export const getSupplyCount = (
  innerCode,
  start,
  end,
  vmType,
  nodeId,
  createUserId
) => {
  return request({
    url: `/api/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
    data: {
      vmType,
      nodeId,
      createUserId,
    },
  });
};

export const getChannelList = (innerCode) => {
  return request({
    url: `/api/vm-service/channel/channelList/` + innerCode,
  });
};

export const getSku = (pageIndex,skuName) => {
  return request({
    url: `/api/vm-service/sku/search`,
    params: {
      pageIndex: pageIndex,
      skuName:skuName
    },
  });
};

// export const editSku = (innerCode, channelList, channelCode, skuId) => {
//   return request({
//     url: "/api/vm-service/channel/channelConfig",
//     method: "PUT",
//     Headers: {
//       "Content-Type": "application/json",
//     },
//     data: {
//       innerCode: innerCode,
//       channelList: channelList,
//       channelCode: channelCode,
//       skuId: skuId,
//     },
//   });
// };

export const editSku = (innerCode, channelList) => {
    return request({
      url: "/api/vm-service/channel/channelConfig",
      method: "PUT",
      Headers: {
        "Content-Type": "application/json",
      },
      data: {
        innerCode: innerCode,
        channelList: channelList,
        
      },
    });
  };


  export const getPolicy = ()=>{
    return request({
      url:'/api/vm-service/policy'
    })
  }

  export const applyPolicy=(data)=>{
    return request({
      url:'/api/vm-service/vm/applyPolicy',
      method: 'PUT',
      data
    })
  }

  export const editNode=(data)=>{
    return request({
      url:'/api/vm-service/node/'+data.id,
      method: 'PUT',
      data
    })
  }

  export const getNode=()=>{
    return request({
      url:'/api/vm-service/node/search'
    })
  }
