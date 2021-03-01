<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到知乎</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rule="emailRules"
          v-model="emailVal"
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
          :rule="passwordRules"
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const emailRules: RuleProp[] = [
  {
    type: 'required', message: '不能为空'
  },
  {
    type: 'email', message: '请输入正确的邮箱格式'
  }
]

const passwordRules: RuleProp[] = [
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
    const emailVal = ref('')
    const passwordVal = ref('2223')
    const store = useStore()
    const router = useRouter()

    const onFormSubmit = (res: boolean) => {
      if (!res) return
      store.dispatch('fetchAndLogin', {
        email: emailVal.value,
        password: passwordVal.value
      }).then(res => {
        console.log(res)
        router.push('/')
      })
    }
    return {
      emailRules,
      passwordRules,
      passwordVal,
      emailVal,
      onFormSubmit
    }
  }
})
</script>
