<template>
    <Nav />
    <CreatePost />
</template>

<script>

import Nav from '@/components/NavMessage.vue'
import CreatePost from '@/components/CreatePost.vue'

export default {
    name: 'CreateMessage',
    components: {
        Nav,
        CreatePost,
    },
}

</script>