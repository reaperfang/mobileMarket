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
  currentComponentId: state => state.decorate.currentComponentId,   //当前装修组件id
  componentDataIds: state => state.decorate.componentDataIds,   //装修组件顺序列表
  componentDataMap: state => state.decorate.componentDataMap   //装修组件数据映射
}
export default getters
