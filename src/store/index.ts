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
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'dufajun',
        columnId: 1
      }
    },
    loseLogin (state) {
      state.user = {
        isLogin: false
      }
    },
    createPost (state, data) {
      state.posts.push(data)
    }
  },
  actions: {
  },
  getters: {
    getColumnListById: (state) => (id: number) => {
      return state.column.find(c => c.id === id)
    },
    getPostsListById: (state) => (id: number) => {
      return state.posts.filter(post => post.columnId === id)
    }
  },
  modules: {
  }
})
