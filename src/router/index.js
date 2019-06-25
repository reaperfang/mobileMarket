import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
Vue.use(Router)
import demoRouter from './demoRouter';
import projectRouter from './projectRouter';
 
export const asyncRouterMap = [  //异步路由表
	...demoRouter,
  ...projectRouter
]

export const syncRouterMap = [ //同步路由表
  {
    path: '',
    component: Layout,
    //redirect: '/login',
    redirect: '/demo/helloWorld'
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/components/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/components/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/components/errorPage/401'),
    hidden: true
  }
]   

export default new Router({
  mode: 'history', 
  scrollBehavior: () => ({ y: 0 }),
  routes: syncRouterMap
})

