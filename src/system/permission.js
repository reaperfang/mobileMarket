/* 权限控制文件 */
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/system/auth' // getToken from cookie



NProgress.configure({ showSpinner: false })// NProgress Configuration

function hasPermission(msfList, route) {
  if (route && route.path) {
    return msfList.some(item => route.meta.title == item.name) || route.name == 'profile' || route.path == '/401' || route.path == '/login' || route.matched[0].path == '/shop' || route.name == 'accountInfo'
  } else {
    return true
  }
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

let flag = 0
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  //  if (true) { // determine if there has token  
  if(store.getters.token){
    const msfList = JSON.parse(localStorage.getItem('shopInfos')).data.msfList
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
        if(flag == 0){
          store.dispatch('GenerateRoutes', msfList).then(() => { // 根据roles权限生成可访问的路由表
            if(store.getters.addRouters.length != 0){
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            }else{
              next({ path: '/401'})
            }
            flag++
          })
        // }).catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if(from.name == 'profile'){
          if (hasPermission(msfList, to)) {
            next()
          } else {
            next({ path: '/401'})
            // next({ path: '/401', replace: true, query: { noGoBack: true }})
          }
        }
        next()
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
