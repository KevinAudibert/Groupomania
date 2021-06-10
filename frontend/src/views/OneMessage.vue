<template>
    <Nav />
    <GetOneMessage /> 
</template>

<script>

import Nav from '@/components/NavMessage.vue'
import GetOneMessage from '@/components/GetOneMessage.vue'

export default {
  name: "OneMessage",
  components: {
    Nav,
    GetOneMessage,
  },
}

</script>

<style>
</style>