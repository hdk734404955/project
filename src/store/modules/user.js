import {
  getToken,
  setToken,
  removeToken,
  setTimeStamp
} from '@/utils/auth';

import {
  login,
  getUserInfo,
  getUserDetailById
} from '@/api/user'
const state = {
  token: getToken(), //设置token为共享状态,初始化vuex时就先从缓存中读取
  userInfo: {} //定义一个空对象
}
const mutations = {
  setToken(state, token) {
    state.token = token; //将数据设置给vuex
    //同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null; //将vuex的数据置空
    removeToken() //同步到缓存
  },
  setUserInfo(state, userInfo) {
    state.userInfo = {
      ...userInfo
    } //更新一个对象
  },
  removeUserInfo(state) {
    state.userinfo = {}
  }
}
const actions = {
  async login(context, data) {
    //调用api接口
    const result = await login(data) //拿到token

    context.commit('setToken', result) //设置token
    setTimeStamp() //设置当前时间戳

  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    //获取用户详情 用户的详情数据
    const baseInfo = await getUserDetailById(result.userId)
    // const obj = {
    //   ...result,
    //   ...baseInfo
    // }
    context.commit('setUserInfo', {
      ...result,
      ...baseInfo
    }) //提交到mutations
    return result
  },
  //登出操作
  logout(context) {
    context.commit('removeToken'),
      context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions



}
