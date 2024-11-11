<template>
    <div>
      <h2>Adicionar Livro</h2>
      <form @submit.prevent="addBook">
        <input type="text" v-model="title" placeholder="Título" required />
        <input type="text" v-model="author" placeholder="Autor" required />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        author: '',
      };
    },
    methods: {
      addBook() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books.push({ title: this.title, author: this.author });
        localStorage.setItem('books', JSON.stringify(books));
        alert('Livro adicionado com sucesso!');
        this.title = '';
        this.author = '';
      },
    },
  };
  </script>
  