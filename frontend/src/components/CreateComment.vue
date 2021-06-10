<template>
    <h1> Nouveau Commentaire </h1>
    <div class="card">
        <div class="form-row">
            <input v-model="content" class="form-row_input" type="text" placeholder="Contenu"/>
        </div>
        <div class="form-row">
            <button type="submit" class="button" @click="createComment()">
                Envoyer le Commentaire
            </button>
        </div>
    </div>
</template>

<script>

//import axios from 'axios'

export default {
    name: 'CreateComment',
    data: function() {
        return {
            content: '',
        }
    },
    methods: {
        createComment() {
            //let userInfo = JSON.parse(localStorage.getItem("user"));
            //let token = userInfo.token
            //let messageId = this.posts.id
            const idPost = this.$route.params.id

            const data = new FormData()       
                data.append("content", this.content);

            console.log(idPost)
            //axios.post(`http://localhost:3000/api/messages/${1}/newcomment`, data, {
            //    headers: { Authorization: "Bearer " + token },
            //})
            //.then(() => {
            //    console.log('coucou');
            //})
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
}

h1 {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
    width: 50%
}

button {
    width: auto;
}

</style>