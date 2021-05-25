<template>
  <div class="navbar">
      <img class="mini-logo" src="../assets/icon.svg">
    <div class="navigation-link">
      <ul>
        <li>
          <router-link to='/profile'>Profil</router-link>
        </li>
        <li>
          <router-link to='/createmessage'>Créer Message</router-link>
        </li>
        <li>
          <a @click= "logout()">Déconnexion</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  mounted: function() {
    if(this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return
    }
    this.$store.dispatch('getUserInfos');
  },
  methods: {
    logout: function() {
      this.$store.commit('logout');
      this.$router.push('/');
    }
}
}

</script>

<style scoped>

.mini-logo {
  width: 60px;
}

.navbar {
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 20px 0 0;
}

a {
  font-size: 1.5rem;
  padding: 2px 10px;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

a:hover {
  color: grey;
}

</style>