<template>
    <h1> Message </h1>
    <div class="card">
        <div class="posts">
            <h3>{{ post.title }}</h3>
            <img class="img-post" :src=post.images />
            <p>{{ post.content }}</p>
            <p> Publié par {{ post.username }} le {{ dateOfPost(post.createdAt) }}</p>
            <p> Likes : {{ post.likes }}</p>
        </div>
        <div class="btn-delete-like" v-if="post.UserId == userId">
            <button @click="deletePost()" type="submit"> Supprimer </button>
            <Like />
        </div>
        <div class="btn-delete-like" v-else>
            <Like />
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import Like from '@/components/Like.vue'

export default {
    name: 'GetOneMessage',
    data: function() {
        return {
            post: [],
            userId: JSON.parse(localStorage.getItem("user")).userId,
        }
    },
    components: {
        Like,
    },
    mounted() {
        this.getOnePost();
    },
    methods: {
        getOnePost() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token
            const messageId = this.$route.params.id

            axios.get(`http://localhost:3000/api/messages/myMessages/${messageId}`, {
                headers: { Authorization: "Bearer " + token } 
            })
            .then(response => { 
                this.post = response.data
            })
        },
        deletePost() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token
            const messageId = this.$route.params.id

            axios.delete(`http://localhost:3000/api/messages/myMessages/${messageId}`, {
                headers: { Authorization: "Bearer " + token } 
            })
            .then(() => this.$router.push("/wall"))
        },
        dateOfPost(date){
            const event = new Date(date);
            const opt = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-Fr', opt);
        },
        loadComments(postId) {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token

            axios.get(`http://localhost:3000/api/messages/${postId}/allcomments`, {
                headers: { Authorization: "Bearer " + token } 
            })
            .then(result => {
                this.comments = result.data
            })
            .catch(error => {
                if(error.response.status == 404) {
                    this.comments = [{content :'Aucun Commentaire pour ce message'}]
                } else {
                    console.log('Une erreur API est survenue')
                }
            })
        },
    },
}

</script>

<style scoped>

.card {
    width: 80%;
}

a {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    text-decoration: none;
    color: black;
}

h1 {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-post {
    max-width: 40%
}

.posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid;
    border-radius: 16px;
    margin: 5%;
}

h3 {
    text-align: center;
}

.btn-delete-like {
    display: flex;
    justify-content: space-around
}

button {
  background: #2196F3;
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