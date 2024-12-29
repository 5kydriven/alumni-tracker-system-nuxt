declare global {
	interface Alumni {
		id?: number;
		uid?: string;
		name?: string;
		email?: string;
		course?: string;
		batch?: number;
		password?: string;
		status?: AlumniStatus;
		isUpdated?: boolean;
		createdAt?: string;
		createdAt?: string;
	}

	type AlumniStatus = 'employed' | 'unemployed' | 'unknown';
}

export { Alumni, AlumniStatus };
