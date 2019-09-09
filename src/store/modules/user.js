import { getToken, setToken, removeToken } from '@/system/auth'
import utils from "@/utils";

const user = {
  state: {
    token: getToken(),
    roles: [],
    userInfo: null,
    shopInfos:''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, userInfo) => {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      state.userInfo = userInfo
    },
    SET_SHOP_INFO:(state, shop) =>{
      localStorage.setItem('shopInfos', JSON.stringify(shop));
      state.shopInfos = shop
    }
  },

  actions: {
    // 用户名登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        this._apis.login.login(userInfo).then(response => {
          if(response.accessToken){
            commit('SET_TOKEN', response.accessToken);
            setToken(response.accessToken);
          }
          if(response.info){
            const user = JSON.parse(response.info);
            if(user){
              // commit('SET_ROLES', ['shop'])
              //所有店铺的功能点列表由扁平化数据转为树形结构
              let data = user.shopInfoMap
              for(let key in data){
                let list = JSON.parse(JSON.stringify(data[key].data.msfList))
                data[key].data.msfList = utils.buildTree(list) 
                console.log('functions',data[key].data.msfList)
              }
              commit('SET_USER_INFO', user)
            }
          }
          resolve()
        }).catch(error => {
          console.log('loginerror')
          reject(error)
        })
      })
    },
     
    //获取店铺id
    getShopInfos({commit},shop){
      return new Promise((resolve, reject) => {
        commit('SET_SHOP_INFO',shop)
        resolve()
      }).catch(error => {
        reject(error)
      })
    },


    // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     this.$api.getUserInfo(state.token).then(response => {
    //       const data = response.data.data

    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }

    //       commit('SET_USER_INFO', data)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    //退出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          localStorage.removeItem('userInfo')
          localStorage.removeItem('shopInfos')
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        localStorage.removeItem('userInfo')
        localStorage.removeItem('shopInfos')
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        let roles = []
        commit('SET_ROLES', roles)
        // commit('SET_TOKEN', role)
        // setToken(role)
      //   this.$api.getUserInfo(role).then(response => {
      //     const data = response.data
      //     commit('SET_ROLES', data.roles)
      //     commit('SET_USER_INFO', data)
      //     dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
      //     resolve()
      //   })
      })
    },
  }
}

export default user
