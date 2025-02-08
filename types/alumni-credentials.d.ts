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
		educationalBackground?: EduactionalBackground[];
	}

	interface WorkExperience {
		uid?: string;
		companyName?: string;
		companyAddress?: string;
		jobTitle?: string;
		startDate?: string;
		endDate?: string;
	}

	interface EduactionalBackground {
		uid?: string;
		schoolName?: string;
		schoolAddress?: string;
		startDate?: string;
		endDate?: string;
	}
}

export { AlumniCredentials, EduactionalBackground, WorkExperience };
