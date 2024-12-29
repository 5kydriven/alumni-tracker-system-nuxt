declare global {
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

export { Experience, Skill };
