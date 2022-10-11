import axios, { AxiosInstance } from 'axios';

export type AxiosPartial = Pick<AxiosInstance, 'get'|'post'|'put'|'delete'>;

export function Api({ get }: AxiosPartial = Axios()) { // eslint-disable-line @typescript-eslint/no-unused-vars
	return {
	};
}
export type Api = ReturnType<typeof Api>;


function Axios() {
	return axios.create({ baseURL: process.env.API_PATH });
}
