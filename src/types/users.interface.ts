export interface IUserAddress {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: {
		lat: string;
		lng: string;
	};
}

export interface IUserCompany {
	name: string;
	catchPhrase: string;
	bs: string;
}

export interface IUserRequest {
	id?: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
}

export interface IUserResponse extends Omit<IUserRequest, 'id'> {
	id: number;
	address?: IUserAddress;
	company?: IUserCompany;
}
