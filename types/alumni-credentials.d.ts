import type { Timestamp } from 'firebase/firestore';

declare global {
	interface AlumniCredentials {
		id?: string;
		status?: string;
		course?: string;
		batch?: string;
		phoneNumber?: string;
		province?: any;
		city?: any;
		zipCode?: string;
		gender?: string;
		maritalStatus?: string;
		birthDate?: any;
		birthPlace?: string;
		description?: string;
		workExperience?: WorkExperience[];
		educationalBackground?: EducationalBackground[];
		seminars?: Seminar[];
		currentWork?: WorkExperience;
		survey?: Survey;
	}

	interface WorkExperience {
		uid?: string;
		companyName?: string;
		companyAddress?: string;
		jobTitle?: string;
		startDate?: any;
		endDate?: any;
		jobType?: string;
		createdAt?: Timestamp;
	}

	interface ExperienceDate {
		month?: any;
		year?: any;
	}

	interface EducationalBackground {
		uid?: string;
		schoolName?: string;
		schoolAddress?: string;
		startDate?: any;
		endDate?: any;
		createdAt?: Timestamp;
	}

	interface Seminar {
		uid?: string;
		name?: string;
		certificateUrl?: string;
		createdAt?: any;
		date?: any;
	}

	type AlumniStatus =
		| 'employed'
		| 'unemployed'
		| 'unknown'
		| 'self-employed'
		| 'freelancer'
		| undefined;
	type Gender = 'female' | 'male' | 'other';
	type Course = 'BSIT' | 'BEED' | 'BSCRIM' | 'BSHM' | 'BSAB' | 'BSED';
}

export {
	AlumniCredentials,
	EducationalBackground,
	WorkExperience,
	ExperienceDate,
};
