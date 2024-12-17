import type { Job } from '~~/types/job';

const jobs: Job[] = [
	{
		id: '1',
		title: 'Software Dev',
		description: 'Lorem Ipsum',
		employmentType: 'Full Time',
		createdAt: '12-12-2025',
		postedBy: 'User 1',
		status: 'active',
	},
];

export default defineEventHandler(async (event) => {
	return jobs;
});
