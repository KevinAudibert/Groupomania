<template>
    <h1> Actualités </h1>
    <div v-if="posts.length != 0" class="card">
        <div class="posts" v-for="post in posts" :key="post.id" >
            <h3>{{ post.title }}</h3>
            <img class="img-post" :src=post.images />
            <p>{{ post.content }}</p>
            <p> Publié par {{ post.username }} le {{ dateOfPost(post.createdAt) }}</p>
            <p> Likes : {{ post.likes }}</p>
                <div class="opt-btn">
                    <router-link :to=" { name: 'OneMessage', params: { id: post.id }} ">
                        <button class="btn-onemessage">Voir le Message</button>
                    </router-link>  

                    <button @click="loadComments(post.id)"> Voir les commentaires</button>
                </div>
                <div class="comments" v-for="comment in comments" :key="comment.id">
                    <p>{{ comment.content }}</p>
                </div>
        </div>
    </div>
    <div class="card" v-else>
        <div class="no-message">
            <p> Aucun Message </p>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'AllPost',
    data: function() {
        return {
            posts: [],
            comments: [],
        }
    },
    mounted() {
        this.getAllPost();
    },
    methods: {
        getAllPost() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token

            axios.get('http://localhost:3000/api/messages', {
                headers: { Authorization: "Bearer " + token } 
            })
            .then(messages => { 
                this.posts = messages.data
            })
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
    }
}

</script>

<style scoped>

.card {
    width: 80%;
}

.no-message {
    text-align: center;
}

.opt-btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
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
    padding: 20px;
}

h3 {
    text-align: center;
}

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