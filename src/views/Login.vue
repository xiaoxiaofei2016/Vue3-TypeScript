<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到知乎</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules" v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RuleProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

const emailMsg: RuleProp[] = [
  {
    type: 'required', message: '不能为空'
  },
  {
    type: 'email', message: '请输入正确的邮箱格式'
  }
]

const passwordMsg: RuleProp[] = [
  {
    type: 'required', message: '不能为空'
  }
]

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const emailVal = ref('11')
    const passwordVal = ref('2223')
    const onFormSubmit = () => {
      console.log('提交啦')
    }
    return {
      emailRules: emailMsg,
      passwordRules: passwordMsg,
      passwordVal,
      emailVal,
      onFormSubmit
    }
  }
})
</script>
