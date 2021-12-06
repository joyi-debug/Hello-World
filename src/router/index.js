import Vue from 'vue'
import VueRouter from 'vue-router'
import Mian from '../views/Main.vue'
const originPush = VueRouter.prototype.push /* 解除重复点击首页不报错问题 */
VueRouter.prototype.push = function(location) {
  return originPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Mian,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/Home')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('@/views/Mall/Mall')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/User/User')
      },
      {
        path: '/other',
        name: 'other',
        component: () => import('@/views/Other/Other')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
