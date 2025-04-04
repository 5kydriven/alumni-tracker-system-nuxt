import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const { isGroup, message, user, currentUid, batch } = await readBody(event);

	if (!currentUid) {
		throw createError({
			statusCode: 400,
			statusMessage: 'User ID is required',
		});
	}

	const createConversation = async (
		participants: string[],
		lastMessage: any,
		name = '',
	) => {
		const conversationRef = await db.collection('conversations').add({
			createdAt: Timestamp.now(),
			isGroup,
			participants,
			lastMessage,
			name,
		});
		return conversationRef.id;
	};

	try {
		if (isGroup) {
			const snapShot = await db
				.collection('users')
				.where('role', '==', 'alumni')
				.where('batch', '==', batch)
				.get();
			const participants = snapShot.docs
				.map((item) => item.id)
				.concat(currentUid);

			const conversationId = await createConversation(
				participants,
				{
					createdAt: Timestamp.now(),
					message: `Created group for ${batch}`,
					senderUid: currentUid,
				},
				user,
			);

			return {
				statusCode: 200,
				statusMessage: 'ok',
				message: 'Successfully created group conversation',
				data: conversationId,
			};
		} else {
			const participants = [user.uid, currentUid];
			const conversationId = await createConversation(participants, {
				createdAt: Timestamp.now(),
				message,
				senderUid: currentUid,
			});

			const messageRef = await db
				.collection('conversations')
				.doc(conversationId)
				.collection('messages')
				.add({
					createdAt: Timestamp.now(),
					message,
					senderUid: currentUid,
					participants,
				});

			return {
				statusCode: 200,
				statusMessage: 'ok',
				message: 'Successfully created conversation',
				data: messageRef.id,
			};
		}
	} catch (error) {
		console.error('Error in /personnel/message.post:', error);
		return errorResponse(error);
	}
});
