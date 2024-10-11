import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js'; // Adjust the import path to match your file

const app = createApp(App);
app.use(router);
app.mount('#app');
