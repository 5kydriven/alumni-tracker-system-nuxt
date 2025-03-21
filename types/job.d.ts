export declare global {
	interface Job {
		id?: string;
		uid?: string;
		employerUid?: string;
		title?: string;
		description?: string;
		status?: string;
		type?: string;
		address?: string;
		email?: string;
		contactPerson?: string;
		salary?: string;
		desiredWeeklyHours?: string;
		createdAt?: any;
		updatedAt?: string;
		companyName?: string;
		applicants?: string[];
	}

	type JobType = 'full-time';
}
