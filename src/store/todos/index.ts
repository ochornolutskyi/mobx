import { autorun, observable, toJS } from 'mobx';

interface ITodosStore {
	all: {
		list: any[];
		isLoading: boolean;
	};

	getAll: () => Promise<void>;
}

export const TodosStore = observable({
	all: {
		list: [],
		isLoading: false,
	},

	async getAll(): Promise<void> {
		try {
			this.all.isLoading = true;
			// this.list
		} finally {
			// this.all.isLoading = false;
		}
	},
});

autorun(() => {
	console.log('change all todo: ', toJS(TodosStore.all));
});
