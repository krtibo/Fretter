import './style/main.scss';
import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import { i18n, router, widgets } from './vue-setup';
import { createPinia } from 'pinia';
import favIcon from './resources/favicon.ico'

const pinia = createPinia();

createApp(RouterView)
		.use(i18n).use(router)
		.use(pinia)
		.use(widgets)
		.use(require('vue-three-shortkey'))
		.mount(document.body);

document.title = 'Fretter App';
const favicon: HTMLLinkElement = document.createElement('link');
favicon.rel = 'icon';
favicon.href = favIcon;
document.head.appendChild(favicon);
