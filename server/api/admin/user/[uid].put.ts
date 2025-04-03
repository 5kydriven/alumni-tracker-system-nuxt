import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';

export default defineEventHandler(async (event: H3Event) => {
	const uid = getRouterParam(event, 'uid');
	const db = getFirestore();
	const user = await readBody(event);

	try {
		if (!uid) {
			throw createError({
				statusCode: 400,
				statusMessage: 'bad request',
				message: 'Required uid',
			});
		}

		if (!user) {
			throw createError({
				statusCode: 400,
				statusMessage: 'bad request',
				message: 'Required body',
			});
		}

		const userDoc = await db
			.collection('users')
			.doc(uid)
			.update({
				...user,
				updatedAt: Timestamp.now(),
				searchKeywords: generateSearchKeywords(user.name as string),
			});

		return successResponse({
			message: 'Successfully updated user',
			data: userDoc,
		});
	} catch (error: any) {
		return errorResponse(error);
	}
});
