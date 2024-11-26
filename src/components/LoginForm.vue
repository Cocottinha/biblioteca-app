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
  async login() {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    const user = users.find(
      (u) => u.cpf === this.cpf && u.password === this.password
    );

    if (user) {
      this.$store.dispatch('login', user);
      alert(`Bem-vindo, ${user.name}!`);
      this.$router.push('/profile');
    } else {
      alert('CPF ou senha inválidos.');
    }
  },
},

};
</script>
