import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		name: 'home', path: '/',
		props: ({ query }) => query,
		component: () => import(/* webpackChunkName: "the-app" */ '../App.vue'),
	},
];

export const router = createRouter({
	routes,
	history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
});