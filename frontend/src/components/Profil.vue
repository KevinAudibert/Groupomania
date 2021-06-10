<template>
    <h1 class="card-title">Mon Profil</h1>
        <div class="card">
            <img src="../assets/avatar_null.png" />
            <div class="infos">
                <p>{{ user.username }}</p>
                <p>{{ user.email }}</p>
                <p v-if="user.bio != null">{{ user.bio }}</p>
            </div>
            <div class="form-row">
                <button @click="goToModify()" type="submit" class="button">
                    Modifier le Profil
                </button>
            </div>
        </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Profil',
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    methods: {
        goToModify() {
            this.$router.push('/modifyProfile');
        }
    },
}

</script>

<style scoped>

h1 {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
    width: 60%
}

.card {
    text-align: center;
}

button {
    width: auto;
}

</style>