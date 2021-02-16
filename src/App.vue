<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <p>{{ state.name }}</p>
  <p>{{ age }}</p>
  <p>{{ ageComputed }}</p>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: 'dufajun',
    })

    const ageRef = ref(21)

    const ageComputed = computed(() => {
      return ageRef.value + 20
    })

    setInterval(() => {
      state.name += '1'
      ageRef.value += 2
    }, 2000)

    watchEffect(() => {
      console.log(ageComputed.value)
    })

    return {
      state,
      age: ageRef,
      ageComputed: ageComputed,
    }
  },
  mounted() {
    console.log(this.age, '--------')
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
