// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from "@/store";
import axios from "axios";
import { getTokenTime } from '@/utils/auth'
// import { Message } from 'element-ui'
const service = axios.create({
  baseURL: "http://localhost:9528/",
  timeout: 5000,
}); // 创建一个axios的实例

const isTimeout = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 10*60 * 1000
  return currentTime - tokenTime > timeout
}

service.interceptors.request.use(async(config) => {
  if (store.state.user.token){
    if (isTimeout()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers['Authorization'] = `${store.state.user.token}`
    }
  }
  return config;
}); // 请求拦截器
service.interceptors.response
  .use
  // (res) => {
  //   const { success, data, msg } = res
  //   if (success) {
  //     return data
  //   }
  //   Message.error(msg)
  //   return Promise.reject(new Error(msg))
  // },
  // function (error) {
  //   Message.error('系统繁忙请重试吧')
  //   return Promise.reject(new Error(error))
  // },
  (); // 响应拦截器
export default service; // 导出axios实例
