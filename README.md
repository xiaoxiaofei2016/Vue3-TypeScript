## vue3新特性
- inheritAttrs: false
  默认在父组件绑定的除props的属性之外的属性是绑定在子组件的跟元素上，inheritAttrs: false可以让他解除该限制
  配合v-bind="$attrs"可以绑定在你想要的元素上
- v-model在组件中使用 子组件默认接收props：modelValue， 改变值emit('update:modelValue', value)