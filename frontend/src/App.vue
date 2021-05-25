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

* {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
}
body {
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  min-height: 100vh;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
.card-title {
  text-align:center;
  font-weight: 800;
}
.card-subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
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