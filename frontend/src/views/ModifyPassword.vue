<template>
    <Nav />
    <Password />
</template>

<script>

import Nav from '@/components/NavMessage.vue'
import Password from '@/components/FormPassword.vue'

export default {
    name: 'ModifyPassword',
    components: {
        Nav,
        Password,
    },
}

</script>