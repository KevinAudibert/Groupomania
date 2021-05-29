<template>
    <Nav />
    <h1> Nouveau Message </h1>
    <div class="card">
        <div class="form-row">
            <input v-model="title" class="form-row_input" type="text" placeholder="Titre" />
        </div>
        <div class="form-row">
            <input v-model="content" class="form-row_input" type="text" placeholder="Contenu"/>
        </div>
        <div class="form-row">
            <input class="file" type="file" ref="file" @change="selectFile()"/>
        </div>
        <div class="form-row">
            <button type="submit" class="button" @click="createNewMessage()">
                Publier
            </button>
        </div>
    </div>
</template>

<script>

import Nav from '../components/NavMessage.vue'
import axios from 'axios'

export default {
    name: 'CreateMessage',
    data: function() {
        return {
            title: '',
            content: '',
            file: null,
        }
    },
    methods: {
        createNewMessage() {
            let userInfo = JSON.parse(localStorage.getItem("user"));
            let token = userInfo.token

            const data = new FormData()       
                if (this.file !== null) {
                    data.append("title", this.title);
                    data.append("content", this.content);
                    data.append("images", this.file, this.file.name);
                } else {
                    data.append("title", this.title);
                    data.append("content", this.content);
                }
            axios.post("http://localhost:3000/api/messages/new", data, {
                headers: { Authorization: "Bearer " + token },
            })
            .then(() => {
                this.$router.push("/AllPost");
            })
        },
        selectFile() {
            this.file = this.$refs.file.files[0];
        },
    },
    components: {
        Nav,
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
