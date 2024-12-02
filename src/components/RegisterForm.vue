<template>
  <div>
    <h2>Cadastro de Usuário</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="name" placeholder="Nome" required />
      <input type="text" v-model="cpf" placeholder="CPF" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Senha" required />
      <select v-model="role" required>
        <option disabled value="">Selecione o tipo de usuário</option>
        <option value="Aluno">Aluno</option>
        <option value="Bibliotecario">Bibliotecário</option>
        <option value="Administrador">Administrador</option>
        <option value="Professor">Professor</option>
      </select>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      cpf: '',
      email: '',
      password: '',
      role: '',
    };
  },
  methods: {
    async register() {
      const newUser = {
        name: this.name,
        cpf: this.cpf,
        email: this.email,
        password: this.password,
        role: this.role,
        blocked: false
      };

      try {
        // Send the new user to the backend
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Erro ao salvar usuário.');
        }

        alert('Usuário cadastrado com sucesso!');
        this.resetForm();
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
        alert('Erro: ' + error.message);
      }
    },
    resetForm() {
      this.name = '';
      this.cpf = '';
      this.email = '';
      this.password = '';
      this.role = '';
    },
  },
};
</script>
