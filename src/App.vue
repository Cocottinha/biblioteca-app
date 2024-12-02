<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Início</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Entrar</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Cadastrar</router-link>
      <router-link v-if="isAuthenticated" to="/books">Livros</router-link>
      <router-link v-if="isAuthenticated" to="/booksForm">Cadastrar Livro</router-link>
      <router-link v-if="isAuthenticated" to="/profile">Perfil</router-link>
      <router-link v-if="isAdmin" to="/admin">Admin</router-link>
    </nav>
    
    <!-- Render the active route's component here -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  created() {
    this.checkSession();
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin']), // Verifica se o usuário está autenticado
  },
  methods: {
    ...mapActions(['checkSession']),
  },
};
</script>

<style>
/* Add some basic styling */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-active {
  font-weight: bold;
  color: #35495e;
}
</style>
