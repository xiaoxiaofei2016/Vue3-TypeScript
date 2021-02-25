import { createStore } from 'vuex'
import { testData, testPosts } from '@/mock/testData'
import { ColumnProps, PostProps, UserProps } from '@/mock/type'

export interface GlobalDataProps {
  column: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export default createStore<GlobalDataProps>({
  state: {
    column: testData,
    posts: testPosts,
    user: {
      isLogin: false
    }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'dufajun' }
    }
  },
  actions: {
  },
  modules: {
  }
})
