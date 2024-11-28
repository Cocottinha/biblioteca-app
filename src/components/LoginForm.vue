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
      try {
        // Fetch all users
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) throw new Error('Erro ao buscar usuários.');

        const data = await response.json();
        const users = data || [];
        const user = users.find(
          (u) => u.cpf === this.cpf && u.password === this.password
        );

        if (user) {
          // Send the logged-in user to the backend
          const saveResponse = await fetch('http://localhost:3000/currentUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
          });
          this.$store.dispatch('login', user);
          if (!saveResponse.ok) throw new Error('Erro ao salvar usuário logado.');

          alert(`Bem-vindo, ${user.name}!`);
          this.$router.push('/profile');
        } else {
          alert('CPF ou senha inválidos.');
        }
      } catch (error) {
        console.error(error);
        alert('Erro: ' + error.message);
      }
    },
  },
};
</script>
