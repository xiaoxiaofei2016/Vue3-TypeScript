import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'
import axios from 'axios'

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
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: __import__('Signup'),
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
  const { requireLogin, redirect } = to.meta
  const isLogin = store.state.user.isLogin
  const token = store.state.token

  if (!isLogin) {
    if (!token) {
      if (requireLogin) {
        next('/login')
      } else {
        next()
      }
    } else {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchUserInfo').then(res => {
        if (redirect) {
          next('/')
        } else {
          next()
        }
      }).catch(() => {
        next('/login')
        store.commit('loseLogin')
      })
    }
  } else {
    if (redirect) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
