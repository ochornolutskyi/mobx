import axios, { AxiosResponse } from 'axios';
import { POST_INITIAL_VALUES } from 'constants/post';
import { autorun, configure, makeAutoObservable, toJS } from 'mobx';
import { IPostRequest, IPostResponse } from 'types';
// strict mode
configure({
	enforceActions: 'always',
});

class PostsService {
	all: {
		list: IPostResponse[];
		isLoading: boolean;
	};

	current: {
		data: IPostRequest | IPostResponse;
		isLoading: boolean;
	};

	constructor() {
		makeAutoObservable(this);

		this.all = { list: [], isLoading: false };
		this.current = { data: POST_INITIAL_VALUES, isLoading: false };
	}

	get postsCount(): number {
		return this.all.list.length;
	}

	postsCountByUser(userId: number): number {
		return this.all.list.filter(item => item.userId === userId).length;
	}

	setCurrentPost(data: IPostResponse | IPostRequest): void {
		this.current.data = data;
	}

	*getAll() {
		this.all.isLoading = true;
		const response: AxiosResponse<IPostResponse[]> = yield axios.get('https://jsonplaceholder.typicode.com/posts');
		this.all.list = response.data;

		this.all.isLoading = false;
	}

	async createPost(reqBody: IPostRequest): Promise<void> {
		try {
			this.current.isLoading = true;
			const response: AxiosResponse<IPostResponse> = await axios.post(
				'https://jsonplaceholder.typicode.com/posts',
				reqBody
			);
			this.setCurrentPost({ ...POST_INITIAL_VALUES });
			this.all.list.push({ ...response.data, id: response.data.id + this.all.list.length });
		} finally {
			this.current.isLoading = false;
		}
	}

	async updatePost(reqBody: IPostRequest): Promise<void> {
		try {
			this.current.isLoading = true;
			const response: AxiosResponse<IPostResponse> = await axios.patch(
				`https://jsonplaceholder.typicode.com/posts/${reqBody.id}`,
				reqBody
			);
			this.setCurrentPost({ ...POST_INITIAL_VALUES });
			this.all.list = this.all.list.map((item: IPostResponse) => (response.data.id === item.id ? response.data : item));
		} finally {
			this.current.isLoading = false;
		}
	}

	async deletePost(id: number): Promise<void> {
		try {
			this.all.isLoading = true;
			await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
			this.all.list = this.all.list.filter((item: IPostResponse) => id !== item.id);
		} finally {
			this.all.isLoading = false;
		}
	}
}

export const PostsStore = new PostsService();

autorun(() => {
	console.log('change current post: ', toJS(PostsStore.current));
});

autorun(() => {
	console.log('change all posts: ', toJS(PostsStore.all));
});
