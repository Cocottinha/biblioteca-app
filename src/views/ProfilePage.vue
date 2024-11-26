<template>
    <div>
        <h2>Profile</h2>
        <div>Nome: {{ user.name }}</div>
        <div>Cargo: {{ user.role }}</div>
        <button @click="logout">Sair</button>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      user: [],
    };
  },
  mounted() {
    fetch('http://localhost:3000/logged')
    .then((response) => response.json())
    .then((data) => {
      this.user = data;
    });
  },
  methods: {
  ...mapActions(['logout']),
},
};
</script>