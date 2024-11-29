<template>
  <div>
    <h2>Lista de Livros</h2>
    <ul>
      <li v-for="(book, index) in books" :key="index">
        <strong>Título:</strong> {{ book.title }}<br />
        <strong>Autor:</strong> {{ book.author }}<br />
        <strong>ISBN:</strong> {{ book.isbn }}<br />
        <strong>Editora:</strong> {{ book.publisher }}<br />
        <strong>Assunto:</strong> {{ book.subject }}<br />
        <strong>Edição:</strong> {{ book.edition }}<br />
        <strong>Data de Inclusão:</strong> {{ book.inclusionDate }}<br />
        <strong>Disponibilidade:</strong> {{ book.availability }}<br />
        <button
          v-if="book.availability === 'disponível'"
          @click="rentBook(book.id)"
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
  async rentBook(bookId) {
    const userCpf = JSON.parse(localStorage.getItem('auth'))?.user.cpf;

    if (!userCpf) {
      alert('Usuário não está logado.');
      return;
    }

    const rentalData = {
      bookId,
      userCpf,
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

      console.log(bookId);
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
}

li {
  margin-bottom: 20px;
}

button {
  margin-top: 10px;
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
