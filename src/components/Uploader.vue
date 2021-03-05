<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    >
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch, PropType } from 'vue'
import axios from 'axios'

type beforeUploadFunc = (e: File) => boolean
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  name: '',
  props: {
    beforeUpload: {
      type: Function as PropType<beforeUploadFunc>
    },
    action: {
      type: String,
      required: true
    },
    uploaded: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const uploadedData = ref(props.uploaded)

    watch(() => props.uploaded, (newValue) => {
      if (newValue) {
        fileStatus.value = 'success'
        uploadedData.value = newValue
      }
    })

    const triggerUpload = () => {
      fileInput.value && fileInput.value.click()
    }

    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) return
          fileStatus.value = 'loading'

          const formData = new FormData()
          formData.append('file', files[0])
          axios.post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            fileStatus.value = 'success'
            uploadedData.value = res.data
            emit('file-uploaded', res.data)
          }).catch(err => {
            fileStatus.value = 'error'
            emit('file-fail', { err })
          }).finally(() => {
            if (fileInput.value) {
              fileInput.value.value = ''
            }
          })
        }
      }
    }

    return {
      triggerUpload,
      fileInput,
      uploadedData,
      fileStatus,
      handleFileChange
    }
  }
})
</script>
