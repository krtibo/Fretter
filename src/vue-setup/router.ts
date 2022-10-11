import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		name: 'home', path: '/',
		props: ({ query }) => query,
		component: () => import(/* webpackChunkName: "the-app" */ '../the-app.vue'),
	},
];

export const router = createRouter({
	routes,
	history: createWebHistory(process.env.PUBLIC_PATH),
});
