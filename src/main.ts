import './style/main.scss';

import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import { i18n, router, widgets } from './vue-setup';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(RouterView)
		.use(i18n).use(router)
		.use(pinia)
		.use(widgets)
		.use(require('vue-three-shortkey'))
		.mount(document.body);

		document.title = 'Fretter App'