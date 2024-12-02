<template>
  <div>
    <h2>Lista de Livros</h2>
    <ul class="center">
      <li v-for="(book, index) in books" :key="index" class="listaLivros">
        <span>Título: {{ book.title }}</span> 
        <span>Autor:  {{ book.author }}</span>
        <span>ISBN:  {{ book.isbn }}</span>
        <span>Editora:  {{ book.publisher }}</span>
        <span>Assunto:  {{ book.subject }}</span>
        <span>Edição:  {{ book.edition }}</span>
        <span>Data de Inclusão:  {{ book.inclusionDate }}</span>  
        <button
          v-if="book.availability === 'disponível'"
          @click="rentBook(book.id, book.title)"
        >
          Alugar Livro
        </button>
        <span v-else style="color: red;">Indisponível</span>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    // Fetch books from the server
    fetch('http://localhost:3000/books')
      .then((response) => response.json())
      .then((data) => {
        this.books = data.books || [];
      });
  },
  methods: {
  async rentBook(bookId, title) {
    const userCpf = JSON.parse(localStorage.getItem('auth'))?.user.cpf;

    if (!userCpf) {
      alert('Usuário não está logado.');
      return;
    }

    const rentalData = {
      bookId,
      userCpf,
      title,
      rentalDate: new Date().toISOString().split('T')[0], // Current date
    };

    try {
      // Register the rental
      const response = await fetch('http://localhost:3000/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rentalData),
      });

      if (!response.ok) throw new Error('Erro ao registrar o aluguel');

      console.log(bookId, title);
      // Update book availability in books.json
      const updateResponse = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availability: 'indisponível' }),
      });

      console.log(updateResponse);

      if (!updateResponse.ok) throw new Error('Erro ao atualizar disponibilidade do livro');

      alert('Livro alugado com sucesso!');
      // Update the availability locally in the UI
      const bookIndex = this.books.findIndex((book) => book.id === bookId);
      if (bookIndex !== -1) {
        this.books[bookIndex].availability = 'indisponível';
      }
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro: ' + error.message);
    }
  },
},
};
</script>

<style>
/* Style for better readability */
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

li {
  margin-bottom: 20px;
}
.listaLivros{
  display: flex;
  flex-direction: row;
  place-items: center;
  text-align: justify;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

span {
  font-weight: bold;
}

</style>
