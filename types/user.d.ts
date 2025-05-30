export declare global {
	interface User<T = any> {
		id?: number;
		uid?: string;
		name?: string;
		firstname?: string;
		lastname?: string;
		middlename?: string;
		email?: string;
		role?: Roles;
		password?: string;
		userCredentials?: T;
		searchKeywords?: string[];
		createdAt?: any;
		updatedAt?: any;
		isUpdated?: boolean;
		permission?: Permission;
		isAgree?: boolean;
	}

	type Permission = 'viewer' | 'editor' | undefined;
}
