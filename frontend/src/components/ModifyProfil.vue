<template>
    <h1 class="card-title">Mes Informations</h1>
        <div class="card">
            <div class="image">
                <img v-if="user.avatar == null" src="../assets/avatar_null.png" />
                <img v-else :src=user.avatar />
                <input class="file" type="file" ref="file" @change="selectFile()"/>
            </div>
            <div class="infos">
                <h3>Informations Personnelles</h3>
                <p>Prénom : {{ user.username }}</p>
                <p>Adresse E-mail : {{ user.email }}</p>
                <p v-if="user.isAdmin == 1">Vous êtes connecté en tant qu'Administrateur</p>
            </div>
            <div class="bio">
                <h3>Biographie</h3>
                <textarea id="biographie" placeholder="Ajoutez quelques lignes à votre Biographie"></textarea>
            </div>
            <div class="form-row">
                <button @click="modifyProfil()" type="submit" class="button">
                    Valider les Modifications
                </button>
                <button @click="()=>$router.push('modifypassword')" class="button">
                    Modifier Mot de Passe
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
    data : function() {
        return {
            bio: '',
            file: null,
        }
    },
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
            this.bio = content.value
            
            const data = new FormData()
                if(this.file) {
                    if(this.bio) {
                        data.append("avatar", this.file, this.file.name);
                        data.append("bio", this.bio);
                        console.log('avatar et bio update')
                    } else {
                        data.append("avatar", this.file, this.file.name);
                        console.log('avatar update')
                    }
                } else if(this.bio || this.bio == ""){
                    data.append("bio", this.bio);
                    console.log('bio update')
                }

            axios.put(`http://localhost:3000/api/users/me/update`, data, {
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
  height: 80px;
  width: 100%;
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
    width: 50%;
    border-radius: 25% 10%;
    border: 2px solid black;
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
    height: 100px;
}

.infos {
    min-height: 150px;
    max-width: 100%;
    background: lightsteelblue;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.infos h3 {
	text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
}

.image {

    padding-bottom: 20px
}

.bio {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

</style>
