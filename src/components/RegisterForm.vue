<template>
    <div>
      <h2>Cadastro de Usuário</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="Usuário" required />
        <input type="password" v-model="password" placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
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
      register() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username: this.username, password: this.password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuário cadastrado com sucesso!');
        this.$router.push('/login');
      },
    },
  };
  </script>
  