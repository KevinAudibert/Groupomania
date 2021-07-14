<template>
    <h1> Nouveau Message </h1>
    <div class="card">
        <div class="form-row">
            <input v-model="title" class="form-row_input" type="text" placeholder="Titre" />
        </div>
        <div class="form-row">
            <input v-model="content" class="form-row_input_content" type="text" placeholder="Contenu"/>
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

import axios from 'axios'

export default {
    name: 'CreatePost',
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
                this.$router.push("/wall");
            })
        },
        selectFile() {
            this.file = this.$refs.file.files[0];
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
.form-row_input_content {
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

.form-row_input_content::placeholder {
    color:#aaaaaa;
}

.form-row_input::placeholder {
    color:#aaaaaa;
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
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
  box-sizing: border-box;
  margin-bottom: 5%
}

button {
    width: auto;
}

</style>