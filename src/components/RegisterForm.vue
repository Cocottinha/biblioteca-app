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
    };

    try {
      // Obter dados do servidor
      const response = await fetch('http://localhost:3000/data');
      if (!response.ok) throw new Error('Erro ao obter dados do servidor');
      
      const data = await response.json();

      // Valide se o array `users` existe, senão inicialize
      if (!data.users) data.users = [];

      // Adicionar o novo usuário
      data.users.push(newUser);

      // Salvar no servidor
      const saveResponse = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!saveResponse.ok) throw new Error('Erro ao salvar dados no servidor');

      alert('Usuário cadastrado com sucesso!');
      this.resetForm();
      this.$router.push('/login');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro: ' + error.message);
    }
  },
}

};
</script>
