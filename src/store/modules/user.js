import { getToken, setToken, removeToken } from '@/system/auth'

const user = {
  state: {
    token: getToken(),
    roles: [],
    userInfo: null
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
    }
  },

  actions: {

    // 用户名登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        this.$api.login(userInfo).then(response => {
          if(response.accessToken){
            commit('SET_TOKEN', response.accessToken);
            setToken(response.accessToken);
          }
          if(response.info){
            const user = JSON.parse(response.info);
            if(user){
              // commit('SET_ROLES', ['shop'])
              commit('SET_USER_INFO', user)
            }
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        this.$api.getUserInfo(state.token).then(response => {
          const data = response.data.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_USER_INFO', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
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
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        this.$api.getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_USER_INFO', data)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
