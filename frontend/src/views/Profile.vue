<template>
    <Nav />
    <Profil />
</template>

<script>

import Nav from '../components/NavProfil.vue'
import Profil from '@/components/Profil.vue'

export default {
    name: 'Profile',
    components: {
        Nav,
        Profil,
    },
}

</script>