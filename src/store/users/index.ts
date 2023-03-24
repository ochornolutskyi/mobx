import axios, { AxiosResponse } from 'axios';
import { USER_INITIAL_VALUES } from 'constants/user';
import { action, autorun, computed, configure, makeObservable, observable, toJS } from 'mobx';
import { IUserRequest, IUserResponse } from 'types';
// strict mode
configure({
	enforceActions: 'always',
});

class UsersService {
	all: {
		list: IUserResponse[];
		isLoading: boolean;
	};

	current: {
		data: IUserResponse | IUserRequest;
		isLoading: boolean;
	};

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

		this.all = { list: [], isLoading: false };
		this.current = { data: USER_INITIAL_VALUES, isLoading: false };
	}

	get usersCount(): number {
		return this.all.list.length;
	}

	setCurrentUser(data: IUserResponse | IUserRequest): void {
		this.current.data = data;
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
			const response: AxiosResponse<IUserResponse[]> = await axios.get('https://jsonplaceholder.typicode.com/users');
			this.all.list = response.data;
		} finally {
			this.all.isLoading = false;
		}
	}

	async createUser(reqBody: IUserRequest): Promise<void> {
		try {
			this.current.isLoading = true;
			const response: AxiosResponse<IUserResponse> = await axios.post(
				'https://jsonplaceholder.typicode.com/users',
				reqBody
			);
			this.setCurrentUser({ ...USER_INITIAL_VALUES });
			this.all.list.push({ ...response.data, id: response.data.id + this.all.list.length });
		} finally {
			this.current.isLoading = false;
		}
	}

	async updateUser(reqBody: IUserRequest): Promise<void> {
		try {
			this.current.isLoading = true;
			const response: AxiosResponse<IUserResponse> = await axios.patch(
				`https://jsonplaceholder.typicode.com/users/${reqBody.id}`,
				reqBody
			);
			this.setCurrentUser({ ...USER_INITIAL_VALUES });
			this.all.list = this.all.list.map((item: IUserResponse) => (response.data.id === item.id ? response.data : item));
		} finally {
			this.current.isLoading = false;
		}
	}

	async deleteUser(id: number): Promise<void> {
		try {
			this.all.isLoading = true;
			await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
			this.all.list = this.all.list.filter((item: IUserResponse) => id !== item.id);
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
