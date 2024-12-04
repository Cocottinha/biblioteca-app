<template>
    <div>
      <h2>Gerenciar Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.cpf">
            <td>{{ user.name }}</td>
            <td>{{ user.cpf }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.blocked ? 'Bloqueado' : 'Ativo' }}</td>
            <td>
              <button @click="toggleBlockUser(user)">
                {{ user.blocked ? 'Desbloquear' : 'Bloquear' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [], // Users list
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await fetch('http://localhost:3000/users');
          if (!response.ok) throw new Error('Erro ao buscar usuários.');
          const data = await response.json();
          this.users = data || [];
        } catch (error) {
          console.error(error);
          alert('Erro ao carregar usuários.');
        }
      },
      async toggleBlockUser(user) {
        try {
          const newBlockedStatus = !user.blocked;
  
          console.log(newBlockedStatus);
          console.log(user.cpf);
          const response = await fetch(`http://localhost:3000/users/${user.cpf}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blocked: newBlockedStatus }),
          });
  
          console.log(response);
          if (!response.ok) throw new Error('Erro ao atualizar status do usuário.');
  
          user.blocked = newBlockedStatus;
          alert(`Usuário ${newBlockedStatus ? 'bloqueado' : 'desbloqueado'} com sucesso.`);
        } catch (error) {
          console.error(error);
          alert('Erro ao atualizar status do usuário.');
        }
      },
    },
  };
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  