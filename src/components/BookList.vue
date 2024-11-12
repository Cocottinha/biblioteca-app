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
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  },
};
</script>

<style>
  
</style>