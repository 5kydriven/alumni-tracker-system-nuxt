export declare global {
	interface User<T = any> {
		id?: number;
		uid?: string;
		name?: string;
		email?: string;
		role?: Roles;
		password?: string;
		course?: string;
		batch?: string;
		userCredentials?: T;
		searchKeywords?: string[];
		createdAt?: any;
		updatedAt?: any;
	}
}
