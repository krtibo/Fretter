import { createI18n } from 'vue-i18n';

import en from '../resources/en-us.json';

export const i18n = createI18n({
	allowComposition: true,
	locale: 'en',
	fallbackLocale: 'en',
	messages: { en },
});

export async function fetchTranslations(
	{ locale, languageCode = locale }:
	{ locale: string; languageCode?: string },
) {
	const translation = await import(/* webpackChunkName: "lang-[request]" */ `src/resources/${locale}.json`);
	i18n.global.setLocaleMessage(languageCode, translation.default);
}
