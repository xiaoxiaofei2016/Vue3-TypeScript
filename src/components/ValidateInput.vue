<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      @input="inputChange"
      v-model="inputRef.val"
      v-bind="$attrs"
    >
    <textarea
      v-else
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    >
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type tagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rule: {
      type: Array as PropType<RuleProp[]>,
      default: () => ([])
    },
    modelValue: String,
    tag: {
      type: String as PropType<tagType>,
      default: 'input'
    }
  },
  // inheritAttrs :false可以取消除props外的属性继承在跟组件
  inheritAttrs: false,
  setup (props, { emit }) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })

    const validateInput = () => {
      if (props.rule) {
        const allPassed = props.rule.every(rule => {
          let isPassed = false
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              if (inputRef.val.trim() !== '') {
                isPassed = true
              }
              break
            case 'email':
              if (emailReg.test(inputRef.val)) {
                isPassed = true
              }
              break
            case 'custom':
              if (rule.validator && rule.validator()) {
                isPassed = true
              }
              break
            default:
              break
          }
          return isPassed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    const inputChange = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      emit('update:modelValue', targetValue)
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    return {
      inputRef,
      validateInput,
      inputChange
    }
  }
})
</script>
