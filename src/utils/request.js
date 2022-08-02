import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
//请求拦截器
service.interceptors.request.use((config) => {
  if (store.state.user.token) {
    config.headers['Authorization'] = 'Bearer ' + store.state.user.token
  }
  return config
})
//响应拦截器
service.interceptors.response.use(
  (res) => {
    const { data, success, message } = res.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    Message.error('系统异常')
    return Promise.reject(error)
  }
)

export default service
