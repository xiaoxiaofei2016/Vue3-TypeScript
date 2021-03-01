<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4><router-link :to="`/posts/${post._id}/`">{{post.title}}</router-link></h4>
        <div class="row my-3 align-items-center">
          <div class="col-4" v-if="post.image">
            <img :src="post.image.url" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed } from 'vue'
import { PostProps } from '@/mock/type'

export default defineComponent({
  name: '',
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      default: () => ([])
    }
  },
  setup (props) {
    const posts = computed(() => {
      return props.list
    })
    return {
      posts
    }
  }
})
</script>
