<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
       @click="loadMorePage" v-if="!isLastPage"
    >
      加载更多
    </button>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是专栏1',
    avatar: 'https://img3.sycdn.imooc.com/5b8ce66d00010a5202000190-140-14.jpg'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是专栏2',
    avatar: ''
  }
]

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const loadMorePage = ref(false)

    return {
      list: testData,
      loadMorePage
    }
  }
})
</script>
