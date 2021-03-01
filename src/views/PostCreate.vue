<template>
  <div class="create-post-page">
    <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4>
    <uploader
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      :uploaded="uploadedData"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.data.url">
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rule="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rule="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-large">{{isEditMode ? '更新文章' : '发表文章'}}</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, PropType } from 'vue'
import ValidateInput, { RuleProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import Uploader from '@/components/Uploader.vue'
import { useRoute, useRouter } from 'vue-router'

import { PostProps } from '@/mock/type'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CreatePost',
  props: {},
  components: {
    ValidateInput,
    Uploader,
    ValidateForm
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const isEditMode = !!route.query.id

    const titleVal = ref('')
    const contentVal = ref('')
    const uploadedData = ref()

    const titleRules: RuleProp[] = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RuleProp[] = [
      { type: 'required', message: '文章详情不能为空' }
    ]

    const uploadCheck = () => {
      //
    }

    const handleFileUploaded = () => {
      //
    }

    const onFormSubmit = (res: boolean) => {
      if (!res) return
      const { columnId } = store.state.user
      if (!columnId) return
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        columnId,
        createdAt: new Date().toLocaleString()
      }
      store.commit('createPost', newPost)
      router.push({
        name: 'ColumnDetail',
        params: {
          id: columnId
        }
      })
    }
    return {
      isEditMode,
      contentRules,
      titleRules,
      contentVal,
      titleVal,
      uploadedData,
      onFormSubmit
    }
  }
})
</script>
