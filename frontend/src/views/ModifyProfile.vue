<template>
    <Nav />
    <ModifyProfil />
</template>

<script>

import Nav from '@/components/NavMessage.vue'
import ModifyProfil from '@/components/ModifyProfil.vue'

export default {
    name: 'ModifyProfile',
    components: {
        Nav,
        ModifyProfil,
    },
}

</script>