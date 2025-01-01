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
		phoneNumber?: string;
		province?: string;
		city?: string;
		zipCode?: string;
		gender?: Gender;
		maritalStatus?: string;
		birthDate?: string;
		birthPlace?: string;
	}

	type AlumniStatus = 'employed' | 'unemployed' | 'unknown';
	type Gender = 'female' | 'male' | 'other';

	interface Address {
		province?: string;
		city?: string;
		zipCode?: string;
	}
}

export { Alumni, AlumniStatus, Address, Gender };
