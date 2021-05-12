<template>
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
        <div class="form-row">
            <button class="button button-disabled" v-if="mode == 'login'">
                Connexion
            </button>
            <button @click="createAccount()" class="button" :class="{'button-disabled' : !validatedFields}" v-else>
                Créer mon compte
            </button>
        </div>
    </div>
</template>

<script>
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
        }
    },
    methods: {
        switchCreateAccount: function() {
            this.mode = "create";
        },
        switchLogAccount: function() {
            this.mode = "login";
        },
        createAccount: function() {
            console.log(this.email, this.username, this.password)
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
</style>