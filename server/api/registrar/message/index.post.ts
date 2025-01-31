import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { isGroup, message, user, currentUid, batch } = await readBody(event);

	try {
		if (!currentUid) {
			throw createError({
				statusCode: 204,
				statusMessage: 'User ID not provided',
			});
		}

		async function createConversation(
			participants: string[],
			lastMessage: any,
			name: string,
		) {
			const conversationDoc = await db.collection('conversations').add({
				createdAt: Timestamp.now(),
				isGroup,
				participants,
				lastMessage,
				name,
			});

			return {
				statusCode: 200,
				statusMessage: 'ok',
				message: isGroup
					? 'Successfully created group conversation'
					: 'Successfully created conversation',
				data: [conversationDoc],
			};
		}

		if (isGroup) {
			const snapShot = await db
				.collection('alumni')
				.where('batch', '==', batch)
				.get();

			const usersUid = snapShot.docs.map((item) => item.id);
			usersUid.push(currentUid);
			const lastMessage = {
				createdAt: Timestamp.now(),
				message: `Created group for ${batch}`,
				senderUid: currentUid,
			};

			return await createConversation(usersUid, lastMessage, user);
		} else {
			const participants = [user.uid, currentUid];
			const lastMessage = {
				createdAt: Timestamp.now(),
				message,
				senderUid: currentUid,
			};

			return await createConversation(participants, lastMessage, '');
		}
	} catch (error) {
		console.error('Error in /registrar/message.post:', error);
		return errorResponse(error);
	}
});
