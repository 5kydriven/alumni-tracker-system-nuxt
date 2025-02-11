import type { Timestamp } from 'firebase/firestore';

declare global {
	interface AlumniCredentials {
		phoneNumber?: string;
		province?: string;
		city?: string;
		zipCode?: string;
		gender?: string;
		maritalStatus?: string;
		birthDate?: string;
		birthPlace?: string;
		description?: string;
		workExperience?: WorkExperience[];
		educationalBackground?: EducationalBackground[];
	}

	interface WorkExperience {
		uid?: string;
		companyName?: string;
		companyAddress?: string;
		jobTitle?: string;
		startDate?: any;
		endDate?: any;
		createdAt?: Timestamp;
	}

	interface EducationalBackground {
		uid?: string;
		schoolName?: string;
		schoolAddress?: string;
		startDate?: any;
		endDate?: any;
		createdAt?: Timestamp;
	}
}

export { AlumniCredentials, EducationalBackground, WorkExperience };
