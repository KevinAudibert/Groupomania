<template>
<h1>Groupomania</h1>
    <h2> Liste des Utilisateurs </h2>
        <div v-if="user.isAdmin == true">
            <div class="users" v-for="user in users" :key="user.id" >
                <img v-if="user.avatar == null" alt="image de profil par defaut" src="../assets/avatar_null.png" />
                <img v-else :alt="'image de profil de ' + user.username" :src=user.avatar />
                <h3>{{ user.username }}</h3>
                <p>{{ user.email }}</p>
                <button v-if="user.id != userId" @click="deleteUserForAdmin(user.id)"> Supprimer </button>
            </div>
        </div>
        <div v-else>
            <h3>Vous n'êtes pas Administrateur</h3>
        </div>
</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex'

export default {
    name: 'AllUser',
    data: function() {
        return {
            users: [],
            userId: '',
        }
    },
    mounted() {
        this.getAllUser();
    },
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    methods: {
        getAllUser() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token

            axios.get('http://localhost:3000/api/users/allusers', {
                headers: { Authorization: "Bearer " + token } 
            })
            .then(users => { 
                this.users = users.data
                this.userId = this.user.id
            })
        },
        deleteUserForAdmin(userId) {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token

            axios.delete(`http://localhost:3000/api/users/allusers/${userId}`, {
                headers: { Authorization: "Bearer " + token } 
            })
            .then(() => {
                window.location.reload()
            })
        }
    }
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

.users {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid #FFD7D7;
    border-radius: 16px;
    margin: 0% 5% 5% 5%;
    padding: 20px;
    background-color: white;
}

img {
    width: 30%;
}

button {
  background: #075697;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  padding: 16px;
  transition: .4s background-color;
}

button:hover {
  cursor:pointer;
  background: #1976D2;
}

</style>