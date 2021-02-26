import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const __import__ = (page: string) => () => import(`@/views/${page}.vue`)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: __import__('Login')
  },
  {
    path: '/column/:id',
    name: 'ColumnDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: __import__('ColumnDetail')
  },
  {
    path: '/create',
    name: 'CreatePost',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: __import__('PostCreate')
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: __import__('PostDetail')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
