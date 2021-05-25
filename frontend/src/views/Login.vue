<template>
    <div class="logo">
        <img src="../assets/icon-left-font-monochrome-black.svg">
    </div>
    <div class="card">
        <h1 class="card-title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="card-title" v-else>Inscription</h1>
        <p class="card-subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card-action" @click="switchCreateAccount()">Créer un compte</span></p>
        <p class="card-subtitle" v-else>Tu as déjà un compte <span class="card-action" @click="switchLogAccount()">Se connecter</span></p>
        <div class="form-row">
            <input v-model="email" class="form-row_input" type="text" placeholder="Adresse mail" />
        </div>
        <div class="form-row" v-if="mode == 'create'">
            <input v-model="username" class="form-row_input" type="text" placeholder="Pseudo"/>
        </div>
        <div class="form-row">
            <input v-model="password" class="form-row_input" type="password" placeholder="Mot de Passe"/>
        </div>
        <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
            Adresse mail et/ou mot de passe invalide
        </div>
        <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
            Adresse mail déjà utilisée
        </div>
        <div class="form-row">
            <button @click="login()" class="button" :class="{'button-disabled' : !validatedFields}" v-if="mode == 'login'">
                <span v-if="status == 'loading'">Connexion en cours ...</span>
                <span v-else>Connexion</span>
            </button>
            <button @click="createAccount()" class="button" :class="{'button-disabled' : !validatedFields}" v-else>
                <span v-if="status == 'loading'">Création en cours ...</span>
                <span v-else>Créer mon compte</span>
            </button>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Login',
    data: function() {
        return {
            mode: 'login',
            email: '',
            username: '',
            password: '',
        }
    },
    mounted: function() {
        if(this.$store.state.user.userId != -1) {
            this.$router.push('/Profile');
            return
        }
    },
    computed: {
        validatedFields: function() {
            if (this.mode == 'create') {
                if (this.email != "" && this.username != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (this.email != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        ...mapState(['status'])
    },
    methods: {
        switchCreateAccount: function() {
            this.mode = "create";
        },
        switchLogAccount: function() {
            this.mode = "login";
        },
        login: function() {
            const self = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })
            .then(function() {
                self.$router.push('profile')
            }), function(error) {
                console.log(error)
            }
        },
        createAccount: function() {
            const self = this;
            this.$store.dispatch('createAccount', {
                email: this.email,
                username: this.username,
                password: this.password
            })
            .then(function() {
                self.login();
            }), function(error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>

.form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
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

.logo {
    display: flex;
    justify-content: center;
    margin-bottom: 5%;
    margin-top: 5%
}
img {
  max-width: 70%;
  border-radius: 8px;
}

</style>