<template>
  <div>
    <h2>Adicionar Livro</h2>
    <form @submit.prevent="addBook">
      <input type="text" v-model="isbn" placeholder="ISBN" required />
      <input type="text" v-model="title" placeholder="Título" required />
      <input type="text" v-model="author" placeholder="Autor" required />
      <input type="text" v-model="publisher" placeholder="Editora" required />
      <input type="text" v-model="subject" placeholder="Assunto" required />
      <input type="number" v-model="edition" placeholder="Edição" required />
      <input type="date" v-model="inclusionDate" placeholder="Data de Inclusão" required />
      <select v-model="availability" required>
        <option value="disponível">Disponível</option>
        <option value="indisponível">Indisponível</option>
      </select>
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
      isbn: '',
      publisher: '',
      subject: '',
      edition: '',
      inclusionDate: '',
      availability: 'disponível',
    };
  },
  methods: {
    addBook() {
      const books = JSON.parse(localStorage.getItem('books')) || [];
      books.push({
        title: this.title,
        author: this.author,
        isbn: this.isbn,
        publisher: this.publisher,
        subject: this.subject,
        edition: this.edition,
        inclusionDate: this.inclusionDate,
        availability: this.availability,
      });
      localStorage.setItem('books', JSON.stringify(books));
      alert('Livro adicionado com sucesso!');
      this.resetForm();
    },
    resetForm() {
      this.title = '';
      this.author = '';
      this.isbn = '';
      this.publisher = '';
      this.subject = '';
      this.edition = '';
      this.inclusionDate = '';
      this.availability = 'Disponível';
    }
  },
};
</script>
<style>
  form{
    display: flex;
    flex-direction: column;
    place-items: center;
    gap: 20px;
    input, select, button{
      width: 200px;
    }
  }
</style>