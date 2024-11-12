<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="cpf" placeholder="CPF" required />
      <input type="password" v-model="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cpf: '',
      password: '',
    };
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (user) =>
          user.cpf === this.cpf && user.password === this.password
      );

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Bem-vindo, ${user.name}!`);
        this.$router.push('/books');
      } else {
        alert('CPF ou senha inválidos');
      }
    },
  },
};
</script>
