import { Api } from '../api';

export function Store({ api }: { api: Api }) { // eslint-disable-line @typescript-eslint/no-unused-vars
	const state = {
	};
	type State = typeof state; // eslint-disable-line @typescript-eslint/no-unused-vars

	const getters = {
	};
	type Getters = { [key in keyof typeof getters]: ReturnType<typeof getters[key]> }; // eslint-disable-line @typescript-eslint/no-unused-vars

	const mutations = {
	};

	const actions = {
	};

	return { state, getters, mutations, actions };
}
export type Store = ReturnType<typeof Store>;
