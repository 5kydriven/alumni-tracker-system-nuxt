import { getApp } from 'firebase-admin/app';
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
	const storage = getStorage(app).bucket();

	if (!uid || !body) {
		throw createError({
			statusCode: 204,
			statusMessage: 'no content',
			message: 'Missing some contents',
		});
	}

	try {
		// Send Email Notification
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

		// Delete Auth User
		await auth.deleteUser(uid);

		// Get the employer's data
		const queuesRef = db.collection('queues').doc(uid);
		const queuesDoc = await queuesRef.get();

		if (!queuesDoc.exists) {
			throw createError({
				statusCode: 404,
				statusMessage: 'not found',
				message: 'Employer not found',
			});
		}

		const queues = queuesDoc.data() as User<EmployerCredentials>;

		// Extract logo and business permit URLs
		const { logo, businessPermit } = queues.userCredentials || {};

		// Function to extract file path from URL
		const extractFilePath = (url: string) => {
			try {
				const decodedUrl = decodeURIComponent(new URL(url).pathname);
				const match = decodedUrl.match(/\/o\/(.*?)\?alt=media/);
				return match && match[1] ? match[1].replace(/%2F/g, '/') : null;
			} catch (error) {
				console.error('Error extracting file path:', error);
				return null;
			}
		};

		// Convert URLs to storage paths
		const logoPath = logo ? extractFilePath(logo) : null;
		const businessPermitPath = businessPermit
			? extractFilePath(businessPermit)
			: null;

		// Delete files from Firebase Storage
		const deleteFile = async (path: string | null) => {
			if (path) {
				await storage
					.file(path)
					.delete()
					.catch((err) => {
						console.error(`Error deleting file ${path}:`, err);
					});
			}
		};

		await Promise.all([deleteFile(logoPath), deleteFile(businessPermitPath)]);

		// Delete the Firestore document
		await queuesRef.delete();

		return successResponse({
			message: 'Successfully rejected employer',
		});
	} catch (error: any) {
		return errorResponse(error);
	}
});
