import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const uid = getRouterParam(event, 'uid');
	const auth = getAuth();
	const { sendMail } = useNodeMailer();
	const config = useRuntimeConfig(event);

	if (!uid) {
		throw createError({
			statusCode: 204,
			statusMessage: 'no content',
			message: 'Required uid',
		});
	}
	try {
		const user = await auth.updateUser(uid, {
			disabled: false,
		});
		const res = await sendMail({
			subject: 'Your Account Has Been Approved!',
			text: 'Hello, your account has been approved. You can now log in and access our services.',
			html: `<p>Hello,</p><p>Your account has been approved. You can now <a href="${config.public.appUrl}">log in</a> and access our services.</p>`,
			to: user.email,
		});

		if (res.err) {
			console.log(res);
			await auth.updateUser(uid, {
				disabled: true,
			});
			throw createError({
				statusCode: 500,
				statusMessage: 'internal server error',
				message: 'Something went wrong',
			});
		}

		const snap = await db.collection('queues').doc(uid).get();

		const users = await db
			.collection('users')
			.doc(user.uid)
			.set({
				...snap.data(),
			});

		return {
			statusCode: 200,
			statusMessage: 'ok',
			message: 'Successfully approved employer',
			data: users,
		} as H3Response;
	} catch (error: any) {
		return errorResponse(error);
	}
});
