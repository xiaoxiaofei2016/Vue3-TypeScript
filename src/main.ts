import { createApp, defineComponent, h, ref } from 'vue'
import App from './App.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const image = require("./assets/logo.png");

// const App = defineComponent({
//   name: "App",
//   setup() {
//     const age = ref(21);

//     return () => {
//       return h("div", { id: "app" }, [
//         h("img", { src: image, alt: "Vue Logo" }),
//         h("p", age.value)
//       ]);
//     };
//   }
// });

createApp(App).mount('#app')
