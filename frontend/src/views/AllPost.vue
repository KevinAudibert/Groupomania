<template>
    <Nav />
    <h1> Actualités </h1>
    <div class="card">
        <div class="posts" v-for="post in posts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <img class="img-post" :src=post.images />
            <p>{{ post.content }}</p>
            <p v-if="post.likes!=0"> Nombre de Like : {{ post.likes }}</p>
            <button @click="createLike(post.id)">Like </button>
            <p> Créé par {{ post.username }} le {{ post.createdAt }}</p>
        </div>
    </div>
</template>

<script>

import Nav from '../components/Nav.vue'
import axios from 'axios'

export default {
    name: 'AllPost',
    data: function() {
        return {
            posts: [],
            title: '',
            content: '',
            images: '',
            likes: '',
            username: '',
        }
    },
    created() {
        axios.get('http://localhost:3000/api/messages')
        .then(messages => { 
            this.posts = messages.data
        })
    },
    methods: {
        createLike(postId) {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token

            axios.post(`http://localhost:3000/api/messages/${postId}/like`, {}, {
                headers: { Authorization: "Bearer " + token } 
            })
            .then(() => this.$router.go(0)) 
        }
    },
    components: {
        Nav,
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

.img-post {
    max-width: 60%
}

.posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid;
    padding: 30px;
    margin: 5%;
}

h3 {
    text-align: center;
}

</style>
