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
import { defineComponent, ref, onMounted, PropType } from 'vue'
import ValidateInput, { RuleProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import Uploader from '@/components/Uploader.vue'
import { useRoute, useRouter } from 'vue-router'
import { beforeUploadCheck } from '@/utils/index'
import createMessage from '@/components/createMessage'

import { PostProps, ResponseType, ImageProps } from '@/mock/type'
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
    let imageId = ''

    const titleVal = ref('')
    const contentVal = ref('')
    const uploadedData = ref()

    const titleRules: RuleProp[] = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentRules: RuleProp[] = [
      { type: 'required', message: '文章详情不能为空' }
    ]

    onMounted(() => {
      if (isEditMode) {
        store.dispatch('fetchPosts', route.query.id).then((rawData: ResponseType<PostProps>) => {
          const currentPost = rawData.data
          if (currentPost.image) {
            uploadedData.value = { data: currentPost.image }
          }
          titleVal.value = currentPost.title
          contentVal.value = currentPost.content || ''
        })
      }
    })

    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过 1Mb', 'error')
      }
      return passed
    }

    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }

    const onFormSubmit = (res: boolean) => {
      if (!res) return
      const { column, _id } = store.state.user
      if (!column) return
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id
      }
      if (imageId) {
        newPost.image = imageId
      }
      const actionName = isEditMode ? 'updatePost' : 'createPost'
      const sendData = isEditMode ? {
        id: route.query.id,
        payload: newPost
      } : newPost
      store.dispatch(actionName, sendData).then(() => {
        createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
        setTimeout(() => {
          router.push({ name: 'column', params: { id: column } })
        }, 2000)
      })
    }
    return {
      isEditMode,
      contentRules,
      titleRules,
      contentVal,
      titleVal,
      uploadedData,
      onFormSubmit,
      uploadCheck,
      handleFileUploaded
    }
  }
})
</script>
