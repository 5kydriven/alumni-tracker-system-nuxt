import { getApp } from 'firebase-admin/app';
import type { App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { H3Event } from 'h3';
import successResponse from '~~/server/utils/okReponse';
import errorResponse from '~~/server/utils/errorResponse';

export default defineEventHandler(async (event: H3Event) => {
	const app = getApp();
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

		const queuesRef = db.collection('queues').doc(uid);
		const queuesDoc = await queuesRef.get();

		if (!queuesDoc.exists) {
			throw createError({
				statusCode: 404,
				statusMessage: 'not found',
				message: 'Employer not found',
			});
		}

		const queues = queuesDoc.data() as { userCredentials: EmployerCredentials };

		const { logo, businessPermit } = queues.userCredentials || {};

		if (logo != '') await deleteFileFromStorage(app, logo);
		if (businessPermit != '') await deleteFileFromStorage(app, businessPermit);

		// Delete the Firestore document
		await queuesRef.delete();

		return successResponse({
			message: 'Successfully rejected employer',
		});
	} catch (error: any) {
		console.log(error);
		return errorResponse(error);
	}
});

async function deleteFileFromStorage(app: App, fileUrl: string) {
	if (!fileUrl) return;

	const bucket = getStorage(app).bucket();
	try {
		const url = new URL(fileUrl);
		const pathParts = url.pathname.split('/o/');
		if (pathParts.length < 2) {
			throw new Error('Invalid storage URL format');
		}
		const filePath = decodeURIComponent(pathParts[1] as string);

		await bucket.file(filePath).delete();
		console.log(`File at ${filePath} deleted successfully`);
	} catch (error) {
		console.error('Error deleting file:', error);
		throw error;
	}
}
