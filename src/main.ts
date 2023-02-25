import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';
import VueThreeShortkey from 'vue-three-shortkey';

import './style/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(VueThreeShortkey);
app.use(router);

app.mount('#app');
