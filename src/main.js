// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router

// Create and mount the app
createApp(App)
  .use(router)  // Use the router in the Vue instance
  .mount('#app');
