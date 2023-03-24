export interface IPostRequest {
	userId: number | null;
	id?: number;
	title: string;
	body: string;
}

export interface IPostResponse extends Omit<IPostRequest, 'id'> {
	userId: number;
	id: number;
	title: string;
	body: string;
}
