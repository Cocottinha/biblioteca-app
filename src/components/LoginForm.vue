<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Usuário" required />
        <input type="password" v-model="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(
          (user) =>
            user.username === this.username && user.password === this.password
        );
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.$router.push('/books');
        } else {
          alert('Usuário ou senha inválidos');
        }
      },
    },
  };
  </script>
  