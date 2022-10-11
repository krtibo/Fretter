import { defineComponent } from 'vue';
import {
	i18n as i18nDefault,
	storeKey, VuexStore, widgets,
} from 'src/vue-setup';
import { I18n } from 'vue-i18n';
import { Router } from 'vue-router';
import { GlobalMountOptions } from '@vue/test-utils/dist/types';

type Options = {
	store?: VuexStore;
	router?: Router;
	i18n?: I18n<unknown, unknown, unknown, unknown, boolean>;
	provide?: GlobalMountOptions['provide'];
}

export function setupOptions({ store, i18n = i18nDefault as NonNullable<Options['i18n']>, router, provide }: Options = {}) {
	const plugins: GlobalMountOptions['plugins'] = [i18n, widgets];
	if (store) { plugins.push([store, storeKey]); }
	if (router) { plugins.push(router); }
	return { global: { renderStubDefaultSlot: true, plugins, stubs, provide } };
}

const stubs = {
	VueFocusLock: defineComponent({
		render() { return this.$slots.default?.(); },
	}),
};
