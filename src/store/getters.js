const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.userInfo || localStorage.getItem('userInfo'),
  roles: state => state.user.roles,
  cid: state => state.user.cid,
  permission_routers: state => state.permission.routers,
  permission_routers_tree: state => state.permission.routers.filter(val => !val.hidden && val.children),
  addRouters: state => state.permission.addRouters,

  mapLoaded: state => state.app.mapLoaded,

  shopInfo: state => state.app.shopInfo,   //店铺信息
  colorStyle: state => state.app.colorStyle,   //店铺风格
  
  currentComponentId: state => state.decorate.currentComponentId,   //当前装修组件id
  componentDataIds: state => state.decorate.componentDataIds,   //装修组件顺序列表
  componentDataMap: state => state.decorate.componentDataMap,   //装修组件数据映射
  baseProperty: state => state.decorate.baseProperty,   //基础属性类型
  baseInfo: state => state.decorate.baseInfo   //店铺装修页面基础信息
}
export default getters
