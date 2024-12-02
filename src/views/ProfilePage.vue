<template>
  <div>
    <h2>Profile</h2>
    <div class="perfil">   
      <span>Nome: {{ user.name }}</span>
      <span>Cargo: {{ user.role }}</span>
      <span>CPF: {{ user.cpf }}</span>
      <button @click="logout">Sair</button>
    </div>
    

    <h2>Livros Alugados</h2>
    <ul class="list">
      <li v-for="(book, index) in userBooks" :key="index">
        <strong>Id do Livro:</strong> {{ book.bookId }}<br />
        <strong>Título:</strong> {{ book.title }}<br />
        <strong>Data de Aquisição:</strong> {{ book.rentalDate }}<br />
        <strong>Data de Entrega:</strong> {{ book.returnDate }}<br />
        <strong>Status:</strong> 
        <span v-if="daysRemaining(book) >= 0">
          {{ daysRemaining(book) }} dia(s) restante(s)
        </span>
        <span v-else>
          Atrasado por {{ Math.abs(daysRemaining(book)) }} dia(s) - Multa: R$ {{ lateFee(book) }}
        </span>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {},
      rentals: [],
    };
  },
  computed: {
    // Filter rentals for the logged-in user
    userBooks() {
      return this.rentals.filter((rental) => rental.userCpf === this.user.cpf);
    },
  },
  mounted() {
    // Fetch logged-in user data
    fetch("http://localhost:3000/logged")
      .then((response) => response.json())
      .then((data) => {
        this.user = data;
      });

    // Fetch rental data
    fetch("http://localhost:3000/rentals")
      .then((response) => response.json())
      .then((data) => {
        this.rentals = data || [];
      });
  },
  methods: {
    ...mapActions(["logout"]),
    daysRemaining(book) {
      const currentDate = new Date();
      const returnDate = new Date(book.returnDate);

      // Calculate the difference in days
      const diffInMs = returnDate - currentDate;
      return Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Convert ms to days
    },
    lateFee(book) {
      const daysOverdue  = Math.abs(this.daysRemaining(book));
      const feePerDay = 5; // Define late fee per day
      return daysOverdue > 0 ? daysOverdue * feePerDay : 0;
    },
  },
};
</script>
<style>
.perfil{
  margin: 0px;
  padding: 0px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  span{
    gap: 10px;
    padding: 10px;
  };
  button{
    margin: 10px;
    width: 50px;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background-color: red;
  }
}
</style>
