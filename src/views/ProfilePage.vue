<template>
    <div>
        <h2>Profile</h2>
        <div>Nome: {{ user.name }}</div>
        <div>Cargo: {{ user.role }}</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      user: [],
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('currentUser')) || [];
  },
};
</script>