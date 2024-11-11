<template>
    <div>
      <h2>Lista de Livros</h2>
      <ul>
        <li v-for="(book, index) in books" :key="index">
          {{ book.title }} - {{ book.author }}
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
  