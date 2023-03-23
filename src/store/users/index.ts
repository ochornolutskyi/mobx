import axios, { AxiosResponse } from 'axios';
import { USER_INITIAL_VALUES } from 'constants/user';
import { create } from 'domain';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { action, computed, configure, flow, makeObservable, observable, override, runInAction, toJS } from 'mobx';
import { IUser } from 'types/users';
// strict mode
configure({ enforceActions: 'always' });

class UsersService {
	all: {
		list: IUser[];

		isLoading: boolean;
	};

	create: {
		data: IUser;
		isLoading: boolean;
	};

	constructor() {
		makeObservable(this, {
			all: observable,
			create: observable,
			usersCount: computed,
			// getAll: flow,
			getAllTest: action,
			createUser: action,
		});
		this.all = { list: [], isLoading: false };
		this.create = { data: { ...USER_INITIAL_VALUES }, isLoading: false };
	}

	get usersCount(): number {
		return this.all.list.length;
	}

	// *getAll(): Generator<Promise<AxiosResponse<IUser[]>>, void, AxiosResponse<IUser[]>> {
	// 	this.isLoading = true;
	// 	const response: AxiosResponse<IUser[]> = yield axios.get('https://jsonplaceholder.typicode.com/users');
	// 	this.list = response.data;
	// 	this.isLoading = false;
	// }

	async getAllTest(): Promise<void> {
		try {
			this.all.isLoading = true;
			const response: AxiosResponse<IUser[]> = await axios.get('https://jsonplaceholder.typicode.com/users');
			this.all.list = response.data;
		} finally {
			this.all.isLoading = false;
			console.log('file: index.ts:46  UsersService  getAll:', toJS(this));
		}
	}

	async createUser(reqBody: IUser): Promise<void> {
		try {
			this.create.isLoading = true;
			const response: AxiosResponse<IUser> = await axios.post('https://jsonplaceholder.typicode.com/users', reqBody);
			this.create.data = { ...USER_INITIAL_VALUES };
			this.all.list.push(response.data);
		} finally {
			this.create.isLoading = false;
			console.log('file: index.ts:63  UsersService  creareUser:', toJS(this));
		}
	}
}

export const UsersStore = new UsersService();
