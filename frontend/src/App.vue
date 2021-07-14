<template>
        <router-view />
</template>

<script>
  export default {
    name: 'App',
    components: {
    },
  }
</script>

<style>

html {
  background-image: url("./assets/Sans titre.png");
  height: 100%
}

* {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
}

body {
  height: 100%
}

#app {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button {
  background: #2196F3;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: .4s background-color;
}
.card-action {
  color:#2196F3;
  text-decoration: underline;
}
.card-action:hover {
  cursor:pointer;
}
.button:hover {
  cursor:pointer;
  background: #1976D2;
}
.button-disabled {
  background:#cecece;
  color:#ececec
}
.button-disabled:hover {
  cursor:not-allowed;
  background:#cecece;
}

</style>