export declare global {
	interface User<T = any> {
		id?: number;
		uid?: string;
		name?: string;
		email?: string;
		role?: Roles;
		password?: string;
		userCredentials?: T;
		searchKeywords?: string[];
		createdAt?: any;
		updatedAt?: any;
		isUpdated?: boolean;
		permission?: Permissions;
	}

	type Permissions = 'viewer' | 'editor';
}
