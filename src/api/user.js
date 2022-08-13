import request from '@/utils/request'

//登录接口封装
export function login(data) {
  //返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data,
  })
}

export function getInfo(token) {

}

export function logout() {

}

//用户信息接口
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'

  })
}
//用户头像接口
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
