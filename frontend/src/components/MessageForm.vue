<template>
    <h1> Message </h1>
    <div class="card">
        <div class="posts">
            <h3>{{ post.title }}</h3>
            <img class="img-post" :src=post.images />
            <div class="user-info">
            <p>{{ post.content }}</p>
            <p> Publié par {{ post.username }} le {{ dateOfPost(post.createdAt) }}</p>
            </div>
        <div class="btn-delete-like" v-if="post.UserId == userId || user.isAdmin == true">
            <button @click="deletePost()" type="submit"> Supprimer </button>
            <Like />
        </div>
        <div class="btn-delete-like" v-else>
            <Like />
        </div>
    </div>
            <Commentform />
            <Comments />
    </div>
</template>

<script>

import axios from 'axios';
import Like from '@/components/Like.vue'
import Commentform from '@/components/CreateComment.vue'
import Comments from '@/components/Comments.vue'
import { mapState } from 'vuex'

export default {
    name: 'GetOneMessage',
    data: function() {
        return {
            post: [],
            userId: JSON.parse(localStorage.getItem("user")).userId,
        }
    },
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    components: {
        Like,
        Commentform,
        Comments,
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

body {
    height: 100%
}

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
    width: 60%;
}

.posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid #FFD7D7;
    border-radius: 16px;
    padding: 20px;
    background-color: white;
}

.img-post {
    max-width: 60%
}

.user-info {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.btn-delete-like {
    display: flex;
    justify-content: space-around;
    width: 100%
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

h3 {
    text-align: center;
    padding-bottom: 2%;
}

</style>