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
    register() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const newUser = {
        name: this.name,
        cpf: this.cpf,
        email: this.email,
        password: this.password,
        role: this.role,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Usuário cadastrado com sucesso!');
      this.resetForm();
      this.$router.push('/login');
    },
    resetForm() {
      this.name = '';
      this.cpf = '';
      this.email = '';
      this.password = '';
      this.role = '';
    }
  },
};
</script>
