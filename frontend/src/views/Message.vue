<template>
    <Nav />
    <MessageForm /> 
</template>

<script>

import Nav from '@/components/NavMessage.vue'
import MessageForm from '@/components/MessageForm.vue'

export default {
  name: "Message",
  components: {
    Nav,
    MessageForm,
  },
}

</script>

<style>
</style>