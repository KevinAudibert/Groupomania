<template>
    <h1 class="card-title">Mes Informations</h1>
        <div class="card">
            <div class="image">
                <img src="../assets/avatar_null.png">
                <input class="file" type="file" ref="file" @change="selectFile()"/>
            </div>
            <div class="infos">
                <h3>Informations Personnelles</h3>
                <p>Prénom : {{ user.username }}</p>
                <p>Adresse E-mail : {{ user.email }}</p>
            </div>
            <div class="bio">
                <h3>Biographie</h3>
                <textarea id="biographie" v-model="message" placeholder="Ajoutez plusieurs lignes à votre Biographie"></textarea>
            </div>
            <div class="form-row">
                <button @click="modifyProfil()" type="submit" class="button">
                    Valider les Modifications
                </button>
                <button @click="deleteProfile()" type="submit" class="button">
                    Supprimer le Profil
                </button>
            </div>
        </div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'ModifyProfil',
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    methods: {
        deleteProfile() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token

            axios.delete("http://localhost:3000/api/users/me/delete", {
                headers: { Authorization: "Bearer " + token },
            })
            .then(() => {
                this.$store.commit('logout');
                this.$router.push("/");
            })
        },
        selectFile() {
            this.file = this.$refs.file.files[0];
        },
        modifyProfil() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token
            let content = document.getElementById('biographie');
            let bio = content.value

            axios.put(`http://localhost:3000/api/users/me/update`, { bio }, {
                headers: { Authorization: "Bearer " + token },
            })
            .then(() => {
                this.$router.push('/profile');
            })
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
    width: 30%;
    border-radius: 100%;
}

.card {
    text-align: center;
}

.form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
}

textarea {
    width: 100%;
    height: 160px;
}

.infos {
    height: 150px;
    max-width: 100%;
    background: lightsteelblue;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-bottom: 15px;
    padding-top: 15px;
}

.image {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 40px
}

.bio {
    height: 230px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 15px
}

</style>
