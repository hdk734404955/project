import user from "./modules/user"

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, //建立token快捷访问
  name: state => state.user.userInfo.username, //建立用户名的快捷访问
  userId: state => state.user.userInfo.userId, // 建立用户id的映射
  staffPhoto: state => state.user.userInfo.staffPhoto //建立头像快捷访问
}
export default getters
