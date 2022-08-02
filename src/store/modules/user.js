import { login, getInfo, getOtherInfo } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
    },
    async getUserInfo(context) {
      const Info = await getInfo()
      const OtherInfo = await getOtherInfo(Info.userId)
      console.log(OtherInfo);
      context.commit('setUserInfo', { ...Info, ...OtherInfo })
    }
  }
}
