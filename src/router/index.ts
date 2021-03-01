import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'

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
    component: __import__('Login'),
    meta: {
      redirect: true
    }
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
    component: __import__('PostCreate'),
    meta: {
      requireLogin: true
    }
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

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin && !store.state.user.isLogin) {
    next({ name: 'Login' })
  } else if (to.meta.redirect && store.state.user.isLogin) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
