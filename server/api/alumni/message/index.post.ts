import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { H3Event } from 'h3';
import initialMessage from '~~/server/utils/initialMessage';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody<{
		employerUid: string;
		alumniUid: string;
		alumniName: string;
		jobUid: string;
		employerName: string;
		companyName: string;
		jobTitle: string;
	}>(event);
	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'No content found',
			});
		}

		const job = await db
			.collection('jobs')
			.doc(body.jobUid)
			.update({
				applicants: FieldValue.arrayUnion(body.alumniUid),
			});

		const conversation = await db.collection('conversations').add({
			createdAt: serverTimestamp(),
			isGroup: false,
			participants: [body.employerUid, body.alumniUid],
			lastMessage: {
				name: body.alumniName,
				senderUid: body.alumniUid,
				createdAt: serverTimestamp(),
				message: initialMessage(
					{
						contactPerson: body.employerName,
						title: body.jobTitle,
						companyName: body.companyName,
					} as Job,
					body.alumniName,
				),
			},
		});

		console.log(conversation.id);

		const message = await db
			.collection('conversations')
			.doc(conversation.id)
			.collection('messages')
			.add({
				name: body.alumniName,
				senderUid: body.alumniUid,
				createdAt: serverTimestamp(),
				message: initialMessage(
					{
						contactPerson: body.employerName,
						title: body.jobTitle,
						companyName: body.companyName,
					} as Job,
					body.alumniName,
				),
			});

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully Applied',
			data: [conversation.id, job, message],
		};
	} catch (error) {
		console.error('Error in /alumni/message.post:', error);
		return errorResponse(error);
	}
});
