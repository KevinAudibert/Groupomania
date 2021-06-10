<template>
    <Nav />
    <ModifyProfil />
</template>

<script>

import Nav from '@/components/NavProfil.vue'
import ModifyProfil from '@/components/ModifyProfil.vue'

export default {
    name: 'ModifyProfile',
    components: {
        Nav,
        ModifyProfil,
    },
}

</script>