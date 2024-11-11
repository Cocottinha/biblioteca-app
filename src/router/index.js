import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Login from '../components/LoginForm.vue';
import Register from '../components/RegisterForm.vue';
import Books from '../components/BookList.vue';
import Profile from '../views/ProfilePage.vue';
import BookForm from '@/components/BookForm.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/books', name: 'Books', component: Books },
  { path: '/booksForm', name: 'BooksForm', component: BookForm },
  { path: '/profile', name: 'Profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
