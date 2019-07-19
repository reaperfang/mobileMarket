const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.userInfo || localStorage.getItem('userInfo'),
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  permission_routers_tree: state => state.permission.routers.filter(val => !val.hidden && val.children),
  addRouters: state => state.permission.addRouters,
  mapLoaded: state => state.app.mapLoaded,
  currentComponentName: state => state.decorate.currentComponentName,   //当前装修组件名称
  componentList: state => state.decorate.componentList,   //装修组件列表
  dataList: state => state.decorate.dataList   //装修数据列表
}
export default getters
