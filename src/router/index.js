import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Home from '../views/HomePage.vue';
import Login from '../components/LoginForm.vue';
import Register from '../components/RegisterForm.vue';
import Books from '../components/BookList.vue';
import Profile from '../views/ProfilePage.vue';
import BookForm from '@/components/BookForm.vue';
import Admin from '@/views/AdminPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/books', name: 'Books', component: Books, meta: {requiresAuth: true} },
  { path: '/booksForm', name: 'BooksForm', component: BookForm, meta: {requiresAuth: true} },
  { path: '/profile', name: 'Profile', component: Profile, meta: {requiresAuth: true} },
  { path: '/admin', name: 'Admin', component: Admin, meta: {requiresAuth: true} },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
