<template>
    <h1 class="card-title">Mon Profil</h1>
        <div class="card">
                <img v-if="user.avatar == null" src="../assets/avatar_null.png" />
                <img v-else :src=user.avatar />
            <div class="infos">
                <h4>Prénom :</h4>
                <p>{{ user.username }}</p>
                <h4>Adresse mail :</h4>
                <p>{{ user.email }}</p>
                <div v-if="user.bio != '' && user.bio != null">
                    <h4>A propos de moi :</h4>
                    <p>{{ user.bio }}</p>
                </div>
                <div v-else>
                    <p>Rendez-vous sur "Modifier le Profil" pour ajouter une Biographie 📝 </p>
                </div>
            </div>
            <div v-if="user.isAdmin == true" class="form-row">
                <button @click="goToModify()" type="submit" class="button">
                    Modifier le Profil
                </button>
                <button @click="goToUserList()" type="submit" class="button">
                    Liste des Utilisateurs
                </button>
            </div>
            <div v-else>
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
        },
        goToUserList() {
            this.$router.push('/listusers')
        }
    },
}

</script>

<style scoped>

h1 {
    height: 80px;
    width: 100%;
    margin-top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FD2D01;
}

img {
    width: 55%;
    border-radius: 40%;
}

.card {
    max-width: 100%;
    width: 540px;
    background: white;
    border-radius: 16px;
    padding: 32px;
    box-sizing: border-box;
    margin-bottom: 5%;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 550px;
}

button {
    width: auto;
}

.infos {
    min-height: 150px;
    min-width: 80%;
    background: lightsteelblue;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
}

.form-row {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 16px 0px;
}

</style>