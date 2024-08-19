import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@arco-design/web-vue/dist/arco.css';
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';
const app = createApp(App);

app.use(router);
app.mount('#app');
