<template>
    <h1 class="card-title">Modification du Mot de Passe</h1>
<div class="card">
        <div class="form-row">
            <label for="password">Mot de Passe Actuel</label>
            <input v-model="password" class="form-row_input" id="password" type="password" />
        </div>
        <div class="form-row">
            <label for="newpassword">Nouveau Mot de Passe</label>
            <input v-model="newpassword" class="form-row_input" id="newpassword" type="password" />
        </div>
        <div class="form-row">
            <label for="confirmpassword">Confirmer Mot de Passe</label>
            <input v-model="confirmpassword" class="form-row_input" id="confirmpassword" type="password" />
        </div>
        <div class="form-row">
            <button class="button" type="submit" @click="getInfos()">
                Modifier le Mot de Passe
            </button>
        </div>
        <div v-if="message">
            {{ message }}
        </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'FormPassword',
    data: function() {
        return {
            password: '',
            newpassword: '',
            confirmpassword: '',
            message: '',
        }
    },
    methods: {
        getInfos() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token
            let password = document.getElementById('password');
            let newpassword = document.getElementById('newpassword');
            let confirmpassword = document.getElementById('confirmpassword');
            this.password = password.value
            this.newpassword = newpassword.value
            this.confirmpassword = confirmpassword.value
            
            if(this.newpassword == this.confirmpassword) {
                axios.put(`http://localhost:3000/api/users/me/updatepassword`, { 
                    "password": this.password,
                    "newpassword": this.newpassword,
                }, { headers: { Authorization: "Bearer " + token },
                })
                .then(() => {
                    this.message = 'Mot de passe modifié avec succès'
                    //this.$router.push('/profile');
                })
            } else {
                this.message = 'La confirmation du Mot de Passe à échouée'
                console.log('Une erreur API est survenue')
            } 
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

.card {
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
  box-sizing: border-box;
  margin-bottom: 5%
}

.form-row {
    display: flex;
    margin: 16px 0px;
    flex-wrap: wrap;
}

.form-row_input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
}

.form-row_input::placeholder {
    color:#aaaaaa;
}

label {
    width: 100%;
}

</style>