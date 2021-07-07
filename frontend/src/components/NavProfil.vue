<template>
  <div class="navbar">
      <img class="mini-logo" src="../assets/icon.svg">
    <div class="navigation-link">
      <ul>
        <li>
          <router-link to='/wall' class="fas fa-home"></router-link>
        </li>
        <li>
          <router-link to='/createmessage' class="far fa-edit"></router-link>
        </li>
        <li>
          <a @click= "logout()" class="fas fa-sign-in-alt"></a>
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
  width: 70px;
}

.navbar {
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  width: 250px;
  justify-content: space-between
}

a {
  font-size: 2.5rem;
  padding: 2px 10px;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

a:hover {
  color: grey;
}

</style>