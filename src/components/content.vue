<template>
  <empty>

  </empty>
</template>

<script>
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  name: "MessageHandler",
  setup() {
    window.$message = useMessage()
  }
})
</script>
