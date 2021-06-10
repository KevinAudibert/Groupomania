<template>
    <div class="btn-like">
        <i v-if="likes == null" @click="createLike()" id="btn-unlike" class="far fa-heart"></i>
        <i v-else  @click="createLike()" id="btn-like" class="fas fa-heart"></i>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Like',
    data: function() {
        return {
            likes: [],
        }
    },
    mounted() {
        this.getLikeMessageUser()
    },
    methods: {
        createLike() {
            let btn = document.getElementById('btn')
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token
            const messageId = this.$route.params.id

            axios.post(`http://localhost:3000/api/messages/${messageId}/like`, {}, {
                headers: { Authorization: "Bearer " + token } 
            })
            .then((result) => {
                if(result.data.message == "J'aime le Message") {
                    btn.classList.remove("far");
                    btn.classList.add("fas");
                } else if(result.data.message == "Je n'aime plus le Message") {
                    btn.classList.remove("fas");
                    btn.classList.add("far");
                }
            })
        },
        getLikeMessageUser() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token
            const messageId = this.$route.params.id

            axios.get(`http://localhost:3000/api/messages/${messageId}/alllikes`, {
                headers: { Authorization: "Bearer " + token } 
            })
            .then(result => {
                this.likes = result.data;
            })
            .catch(error => {
                if(error.response.status == null) {
                    console.log('pas coucou')
                } else {
                    console.log('Une erreur API est survenue')
                }
            })
        },
    },
}
</script>

<style scoped>

.btn-like {
    display: flex;
    align-items: center;
}

.btn-like p {
    margin-left: 10px;
}

.btn-like i {
    font-size: 2rem;
    transition: .4s;
}

.btn-like:hover i {
    color: #f50057;
}

.fas {
    color: #f50057;
    transition: .4s;
}

</style>