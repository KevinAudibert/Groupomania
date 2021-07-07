<template>
    <Nav />
    <InfoProfil />
</template>

<script>

import Nav from '../components/NavProfil.vue'
import InfoProfil from '@/components/InfoProfil.vue'

export default {
    name: 'Profile',
    components: {
        Nav,
        InfoProfil,
    },
}

</script>