import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Test',
    component: () => import('@/components/Test'),
    meta: {keepAlive: false}
  },
  {
    path: '/TestChild',
    name: 'TestChild',
    component: () => import('@/components/TestChild'),
    meta: {keepAlive: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
