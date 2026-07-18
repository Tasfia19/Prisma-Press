export interface UserCreatePayload {
	name: string;
	email: string;
	password: string;
	role?:string,
	profilePhoto?: string;
}


export type TMeta = {
	page: number;
	limit: number;
	total: number;
};

export type TSendResponse<T> = {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
	meta?: TMeta;
};