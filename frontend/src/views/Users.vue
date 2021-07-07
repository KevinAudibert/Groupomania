<template>
    <Nav />
    <ListProfils />
</template>

<script>

import Nav from '@/components/NavMessage.vue'
import ListProfils from '@/components/AllUser.vue'

export default {
    name: 'Users',
    components: {
        Nav,
        ListProfils,
    },
}

</script>