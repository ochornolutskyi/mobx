import axios, { AxiosResponse } from 'axios';
import { USER_INITIAL_VALUES } from 'constants/user';
import { action, autorun, computed, configure, flow, makeObservable, observable, runInAction, toJS } from 'mobx';
import { IUserRequest, IUserResponse } from 'types';
// strict mode
configure({
	enforceActions: 'always',
	reactionScheduler: f => {
		setTimeout(f);
	},
});

interface IUserStoreAll {
	list: IUserResponse[];
	isLoading: boolean;
}

interface IUserStoreCurrent {
	data: IUserRequest | IUserResponse;
	isLoading: boolean;
}

class UsersService {
	all: IUserStoreAll = { list: [], isLoading: false };

	current: IUserStoreCurrent = { data: USER_INITIAL_VALUES, isLoading: false };

	constructor() {
		makeObservable(this, {
			all: observable,
			current: observable,
			usersCount: computed,
			// getAll: flow,
			getAllTest: action,
			createUser: action,
			setCurrentUser: action,
			updateUser: action,
			deleteUser: action,
		});
	}

	get usersCount(): number {
		return this.all.list.length;
	}

	setCurrentUser(data: IUserResponse | IUserRequest): void {
		this.current.data = data;
	}

	// *getAll() {
	// 	this.all.isLoading = true;
	// 	const response: AxiosResponse<IUserResponse[]> = yield axios.get('https://jsonplaceholder.typicode.com/users');
	// 	this.all.list = response.data;
	// 	this.all.isLoading = false;
	// }

	async getAllTest(): Promise<void> {
		try {
			this.all.isLoading = true;
			const response: AxiosResponse<IUserResponse[]> = await axios.get('https://jsonplaceholder.typicode.com/users');
			runInAction(() => {
				this.all.list = response.data;
			});
		} finally {
			runInAction(() => {
				this.all.isLoading = false;
			});
		}
	}

	async createUser(reqBody: IUserRequest): Promise<void> {
		try {
			this.current.isLoading = true;
			const response: AxiosResponse<IUserResponse> = await axios.post(
				'https://jsonplaceholder.typicode.com/users',
				reqBody
			);
			runInAction(() => {
				this.setCurrentUser({ ...USER_INITIAL_VALUES });
				this.all.list.push({ ...response.data, id: response.data.id + this.all.list.length });
			});
		} finally {
			runInAction(() => {
				this.current.isLoading = false;
			});
		}
	}

	async updateUser(reqBody: IUserRequest): Promise<void> {
		try {
			this.current.isLoading = true;
			const response: AxiosResponse<IUserResponse> = await axios.patch(
				`https://jsonplaceholder.typicode.com/users/${reqBody.id}`,
				reqBody
			);
			runInAction(() => {
				this.setCurrentUser({ ...USER_INITIAL_VALUES });
				this.all.list = this.all.list.map((item: IUserResponse) =>
					response.data.id === item.id ? response.data : item
				);
			});
		} finally {
			runInAction(() => {
				this.current.isLoading = false;
			});
		}
	}

	async deleteUser(id: number): Promise<void> {
		try {
			this.all.isLoading = true;
			await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
			runInAction(() => {
				this.all.list = this.all.list.filter((item: IUserResponse) => id !== item.id);
			});
		} finally {
			this.all.isLoading = false;
		}
	}
}

export const UsersStore = new UsersService();

autorun(() => {
	console.log('change current user: ', toJS(UsersStore.current));
});

autorun(() => {
	console.log('change all user: ', toJS(UsersStore.all));
});
