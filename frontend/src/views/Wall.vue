<template>
    <Nav />
    <AllPost />
</template>

<script>

import Nav from '@/components/Nav.vue'
import AllPost from '@/components/AllPost.vue'

export default {
    name: 'Wall',
    components: {
        Nav,
        AllPost,
    },
}

</script>