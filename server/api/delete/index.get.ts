import { getAuth } from 'firebase-admin/auth';

export default defineEventHandler(async (event) => {
	const auth = getAuth();
	async function listAndDeleteUsers(
		nextPageToken?: string,
		deleteCount: number = 0,
	) {
		try {
			const listUsersResult = await auth.listUsers(1000, nextPageToken);

			// Extract user UIDs
			const userUids = listUsersResult.users.map((user) => user.uid);
			console.log('Users to Delete:', userUids);

			// Delete only the first 400 users
			const usersToDelete = userUids.slice(0, 400);
			if (usersToDelete.length > 0) {
				await auth.deleteUsers(usersToDelete);
				console.log(`Successfully deleted ${usersToDelete.length} users.`);
				deleteCount += usersToDelete.length;
			}

			// Stop after deleting 400 users
			if (deleteCount >= 400) {
				console.log('Deleted 400 users, stopping process.');
				return;
			}

			// If there are more users, continue fetching and deleting
			if (listUsersResult.pageToken) {
				await listAndDeleteUsers(listUsersResult.pageToken, deleteCount);
			}
		} catch (error) {
			console.error('Error listing or deleting users:', error);
		}
	}

	try {
		await listAndDeleteUsers();
		return {
			message: 'User deletion process started. 400 users will be deleted.',
		};
	} catch (error) {
		console.error(error);
		return { error: 'Failed to delete users.' };
	}
});
