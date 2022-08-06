import request from "@/utils/request";

export const getTask= ()=>{
    return request({
        url:'/api/task-service/task/search'
    })
}