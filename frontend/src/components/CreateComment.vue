<template>
    <div class="card-comment">
        <h3> Ajouter un Commentaire </h3>
        <div class="form-row">
            <textarea v-model="content" class="form-row_input" type="text" placeholder="Contenu" rows="2" cols="20"></textarea>
        </div>
        <div class="form-row">
            <button type="submit" class="button" @click="createComment()">
                Publier Commentaire
            </button>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'CreateComment',
    data: function() {
        return {
            content: '',
        }
    },
    methods: {
        createComment() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token
            const idPost = this.$route.params.id
            let content = this.content

            axios.post(`http://localhost:3000/api/messages/${idPost}/newcomment`, { content }, {
                headers: { Authorization: "Bearer " + token },
            })
            .then(() => window.location.reload())
        },
    },
}

</script>

<style scoped>

.form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
    justify-content: center;
    width: 60%;
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

.card-comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3%;
}

button {
    width: auto;
}

.form-row_input{
    height: 100px;
    width: 500px;
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

</style>