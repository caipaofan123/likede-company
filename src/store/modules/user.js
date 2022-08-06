import {login,getUserInfo} from '@/api/user'
export default  {
  namespaced: true,
  state: {
    token:'',
    clientToken:'',
    userId:'',
    userInfo:{}

  },
  mutations: {
    setToken(state,payload){
      state.token = payload.token
      state.userId = payload.userId
    },
    setClientToken(state,payload){
      state.clientToken = payload
    },
    setUserInfo(state,payload){
      state.userInfo = payload
    },
    logout(state){
      state.token=''
      state.userInfo={}
    }
  },
  actions: {
    async getToken(context,payload){
      const res = await login(payload)
      // const res1 = await getInfo(res.data.userId)
      // console.log(res)
      // console.log(res1)
      context.commit('setToken',res.data)
    },
    async getUserInfo(context,payload) {
      const res = await getUserInfo(payload)
      // console.log(res);
      context.commit('setUserInfo',res.data)
    },
    getClientToken(context,payload){
      context.commit('setClientToken',payload)
    },
    logout(context){
      context.commit('logout')
    }

  }
}
