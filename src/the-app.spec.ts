import { shallowMount } from '@vue/test-utils';
import { routerKey } from 'vue-router';
import { setupOptions, setupStore } from 'test/utils';
import App from './the-app.vue';

test('displays in English by default', async () => {
	const { vm } = setup();
	expect(vm.$i18n.locale).toBe('en');
});

function setup() {
	const { store } = setupStore();
	const router = { push: jest.fn() };
	const provide = { [routerKey as symbol]: router };
	const wrapper = shallowMount(App, setupOptions({ store, provide }));
	return { wrapper, vm: wrapper.vm, router };
}

