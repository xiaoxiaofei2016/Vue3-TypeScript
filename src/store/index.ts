import { createStore, Commit } from 'vuex'
import { GlobalDataProps, GlobalErrorProps } from '@/mock/type'
import axios, { AxiosRequestConfig } from 'axios'
import { objToArr, arrToObj } from '@/utils/index.ts'

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
    column: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: {
      isLogin: false
    },
    loading: false,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    createPost (state, data) {
      state.posts.data[data._id] = data
    },
    fetchColumns (state, rawData) {
      const { data } = state.column
      const { list, count, currentPage } = rawData.data
      state.column = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: currentPage * 1
      }
    },
    fetchColumn (state, data) {
      state.column.data[data.data._id] = data.data
    },
    fetchPosts (state, { data: rawData, extraData: columnId }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
      state.posts.loadedColumns.push(columnId)
    },
    deletePost (state, { data }) {
      delete state.posts.data[data._id]
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
    loseLogin (state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
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
    createPost ({ commit }, payload) {
      return asyncAndCommit('/posts', 'createPost', commit, { method: 'post', data: payload })
    },
    deletePost ({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, { method: 'delete' })
    },
    updatePost ({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: payload
      })
    },
    fetchAndLogin ({ dispatch }, payload) {
      return dispatch('login', payload).then(() => {
        return dispatch('fetchUserInfo')
      }).catch(() => false)
    }
  },
  getters: {
    getColumns: (state) => {
      return objToArr(state.column.data)
    },
    getColumnListById: (state) => (id: string) => {
      return state.column.data[id]
    },
    getPostsListById: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  },
  modules: {
  }
})
