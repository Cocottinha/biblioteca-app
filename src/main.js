import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Importa a store
import router from './router'; // Importa o router

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
