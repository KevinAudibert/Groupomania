<template>
    <div>
        <div class="comments" v-for="comment in comments" :key="comment.id">
            <h4 v-if="comment.username">{{ comment.username }} a commenté le {{ dateOfPost(comment.createdAt) }}</h4>
            <p>{{ comment.content }}</p>
            <a v-if="comment.userId == userId || user.isAdmin == 1 && comment.content != 'Aucun Commentaire pour ce message'" @click="deleteComment(comment.id)" class="fas fa-trash-alt"></a>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { mapState } from 'vuex'

export default {

    name: 'Comments',
    data: function() {
        return {
            comments: [],
            userId: JSON.parse(localStorage.getItem("user")).userId,
        }
    },
    mounted() {
        this.loadComments()
    },
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    methods: {
        loadComments() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token
            const messageId = this.$route.params.id

            axios.get(`http://localhost:3000/api/messages/${messageId}/allcomments`, {
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
        dateOfPost(date){
            const event = new Date(date);
            const opt = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-Fr', opt);
        },
        deleteComment(commentId){
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token

            axios.delete(`http://localhost:3000/api/messages/mycomment/${commentId}`, {
                headers: { Authorization: "Bearer " + token } 
            })
            .then(() => window.location.reload())
        },
    }
}

</script>

<style scoped>

.comments {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 4px 2px 15px 5px rgba(0,0,0,0.33); 
    box-shadow: 0px 10px 13px -7px #000000, 4px 2px 15px 5px rgba(0,0,0,0.33);
    margin-top: 25px;
    margin-bottom: 25px;
    padding: 2%;
    background-color: white;
}

a {
    font-size: 1.5rem;
    padding: 5px 5px;
    cursor: pointer;
    text-decoration: none;
    color: black;
}

a:hover {
    color: grey;
}

</style>