import axios from 'axios'
import store from '@/store'
import {
  Message
} from 'element-ui'
import router from '@/router'
import {
  getTimeStamp
} from '@/utils/auth'
const TimeOut = 3600 //定义超时时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 //设置超时时间
})
// 请求拦截器
service.interceptors.request.use(config => {
  //config是请求配置信息,必须返回
  if (store.getters.token) { //如果token存在，注入token
    //有token才能检查时间戳是否超时
    if (IsCheckTimeOut()) {
      //为true表示过期
      store.dispatch('user/logout') //登出操作
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  const {
    success,
    message,
    data
  } = response.data //解构响应对象
  if (success) { //判断登录状态
    return data
  } else {
    Message.error(message) //提示错误信息
    return Promise.reject(new Error(message))

  }
}, error => {
  //判断token超时被动处理
  if (error.response && error.response.data && error.response.data.code === 10002) {
    //等于10002时后端告诉我们token超时了
    store.dispatch('user/logout') //登出action 删除token
    router.push('/login')
  }
  Message.error(error.message)
  return Promise.reject(error)
})
//是否超时 当前时间-缓存时间是否大于时间差
function IsCheckTimeOut() {
  var currenTime = Date.now() //设置当前时间
  var timeStamp = getTimeStamp() //缓存时间戳
  return (currenTime - timeStamp) / 1000 > TimeOut
}
export default service
