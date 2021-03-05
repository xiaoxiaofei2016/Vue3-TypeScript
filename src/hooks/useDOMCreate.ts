import { onUnmounted } from 'vue'

function useDOMCreate (nodeId: string) {
  const div = document.createElement('div')
  div.id = nodeId
  document.body.appendChild(div)
  onUnmounted(() => {
    document.body.removeChild(div)
  })
}

export default useDOMCreate
