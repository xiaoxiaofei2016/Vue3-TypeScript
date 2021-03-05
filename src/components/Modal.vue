<template>
  <div></div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed } from 'vue'
export default defineComponent({
  name: '',
  props: {},
  setup (props, { slots, attrs, emit }) {
    console.log(props, 'props')
  }
})
</script>
