import { createStore, Commit } from 'vuex'
import { GlobalDataProps, GlobalErrorProps } from '@/mock/type'
import axios, { AxiosRequestConfig } from 'axios'

const asyncAndCommit = async (url: string, mutationName: string,
  commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}

export default createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    column: [],
    posts: [],
    user: {
      isLogin: false
    },
    loading: false,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    loseLogin (state) {
      state.user = {
        isLogin: false
      }
    },
    createPost (state, data) {
      state.posts.push(data)
    },
    fetchColumns (state, data) {
      state.column = data.data.list
    },
    fetchColumn (state, data) {
      state.column = [data.data]
    },
    fetchPosts (state, data) {
      state.posts = data.data.list
    },
    setLoading (state, data) {
      state.loading = data
    },
    login (state, payload) {
      const { token } = payload.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    getUserInfo (state, data) {
      state.user = {
        isLogin: true,
        ...data.data
      }
    },
    setError (state, error: GlobalErrorProps) {
      state.error = error
    }
  },
  actions: {
    fetchColumns ({ commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      return asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    login ({ commit }, payload) {
      return asyncAndCommit('/user/login', 'login', commit, { method: 'post' }, payload)
    },
    fetchUserInfo ({ commit }) {
      return asyncAndCommit('/user/current', 'getUserInfo', commit)
    },
    fetchAndLogin ({ dispatch }, payload) {
      return dispatch('login', payload).then(() => {
        return dispatch('fetchUserInfo')
      }).catch(() => false)
    }
  },
  getters: {
    getColumnListById: (state) => (id: string) => {
      return state.column.find(c => c._id === id)
    },
    getPostsListById: (state) => state.posts
  },
  modules: {
  }
})
