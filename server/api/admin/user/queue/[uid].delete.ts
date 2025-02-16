import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const uid = getRouterParam(event, 'uid');
	const auth = getAuth();
	const body = await readBody(event);
	const { sendMail } = useNodeMailer();

	if (!uid || !body) {
		throw createError({
			statusCode: 204,
			statusMessage: 'no content',
			message: 'Missing some contents',
		});
	}
	try {
		const res = await sendMail({
			subject: 'Your Account Application Status',
			html: `<p>Hello ${body.displayName},</p>
						 <p>${body.message}</p>`,
			to: body.email,
		});

		if (res.err) {
			console.log(res);
			throw createError({
				statusCode: 500,
				statusMessage: 'internal server error',
				message: 'Something went wrong',
			});
		}

		await auth.deleteUser(uid);
		const snap = await db.collection('queues').doc(uid).delete();

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully rejected employer',
			data: snap,
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
