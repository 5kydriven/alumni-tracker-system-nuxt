export default defineEventHandler(async (event) => {
	const jobs: Job[] = [
		{
			id: '1',
			title: 'Software Dev',
			description: 'Lorem Ipsum',
			type: 'Full Time',
			createdAt: '12-12-2025',
			postedBy: 'User 1',
			status: 'active',
		},
	];
	return jobs;
});
