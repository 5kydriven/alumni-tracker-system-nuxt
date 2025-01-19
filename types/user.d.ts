export declare global {
	interface User<T = any> {
		id?: number;
		uid?: string;
		name?: string;
		email?: string;
		role?: string;
		password?: string;
		userCredentials?: T;
		searchKeywords?: string[];
		createdAt?: any;
	}
}
