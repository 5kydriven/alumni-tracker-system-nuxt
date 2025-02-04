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
		createdAt?: any;
		phoneNumber?: string;
		province?: string;
		city?: string;
		zipCode?: string;
		gender?: string;
		maritalStatus?: string;
		birthDate?: string;
		birthPlace?: string;
		role?: Roles;
	}

	type AlumniStatus =
		| 'employed'
		| 'unemployed'
		| 'unknown'
		| 'self-employed'
		| 'freelancer';
	type Gender = 'female' | 'male' | 'other';
	type Course = 'BSIT' | 'BEED' | 'BSCRIM' | 'BSHM' | 'BSAB' | 'BSED';

	interface Address {
		province?: string;
		city?: string;
		zipCode?: string;
	}
}

export { Alumni, AlumniStatus, Address, Gender, Course };
