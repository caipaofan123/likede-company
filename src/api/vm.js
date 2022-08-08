import request from "@/utils/request";

export const getVms=()=>{
    return request({
        url:'/api/vm-service/vmType/search'
        
    })
}

export const editVms=(data)=>{
    return request({
        url:'/api/vm-service/vmType/'+data.typeId,
        Headers:{
            'Content-Type':'application/json'	
        },
        method: 'PUT',
        data,
    })
}