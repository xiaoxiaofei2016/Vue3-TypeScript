<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

export const emitter = mitt()

export type emitFunc = () => boolean

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (_, { emit }) {
    let funcArr: emitFunc[] = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(item => item)
      emit('form-submit', result)
    }

    const callback = (func?: emitFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }

    emitter.on('form-item-created', callback)

    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })

    return {
      submitForm
    }
  }
})
</script>
