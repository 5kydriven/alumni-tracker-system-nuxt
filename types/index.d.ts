declare global {
	interface Alumni {
		id: number;
		name: string;
		email: string;
		course: string;
		batch: number;
		status: AlumniStatus;
	}

	type AlumniStatus = 'employed' | 'unemployed' | 'unknown';

	interface Experience {
		jobTitle?: string;
		companyName?: string;
		address?: string;
		workType?: string;
		startDate?: string;
		endDate?: string;
		slot?: string;
		defaultOpen?: boolean;
	}

	interface Skill {
		skill?: string;
		level?: string;
	}
}

export { Alumni, AlumniStatus, Experience, Skill };
