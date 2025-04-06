import { getAuth } from 'firebase-admin/auth';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const auth = getAuth();

	try {
		// Function to delete users created on a specific date, limiting to 50 users
		async function deleteUsersByDate(selectedDate: Date, limit: number) {
			let nextPageToken;
			let deletedCount = 0;

			// Loop through users to fetch and delete those with the selected creation date
			do {
				const listUsersResult = await auth.listUsers(1000, nextPageToken);
				nextPageToken = listUsersResult.pageToken;

				// Filter users by the creation date
				for (const userRecord of listUsersResult.users) {
					const userCreationDate = new Date(userRecord.metadata.creationTime);

					// Compare creation date with the selected date (April 6)
					if (userCreationDate.toDateString() === selectedDate.toDateString()) {
						try {
							await auth.deleteUser(userRecord.uid);
							console.log(`Deleted user: ${userRecord.email}`);
							deletedCount++;

							// Stop if we have deleted the specified limit of users
							if (deletedCount >= limit) {
								console.log(`Deleted ${deletedCount} users.`);
								return;
							}
						} catch (error: any) {
							console.error(`Error deleting user: ${error.message}`);
						}
					}
				}
			} while (nextPageToken && deletedCount < limit); // Continue if there are more users and limit is not reached
		}

		// Define the selected date (April 6, 2025) and limit to 50 deletions
		const selectedDate = new Date('2025-04-06');
		const limit = 15;

		// Call the delete function
		await deleteUsersByDate(selectedDate, limit);

		return {
			message: `Deletion process completed for ${limit} users created on April 6, 2025.`,
		};
	} catch (error: any) {
		return errorResponse(error);
	}
});
