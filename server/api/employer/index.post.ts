import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { H3Event, readMultipartFormData } from 'h3';
import successResponse from '~~/server/utils/okReponse';
import errorResponse from '~~/server/utils/errorResponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';

export default defineEventHandler(async (event: H3Event) => {
	const auth = getAuth();
	const db = getFirestore();
	const storage = getStorage().bucket();
	const formData = await readMultipartFormData(event);

	try {
		if (!formData) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'No content found',
			});
		}
		console.log(formData);

		const fields: Record<string, string> = {};
		const images: { file: Buffer; fileName: string }[] = [];
		let logoFile: Buffer | null = null;
		let businessPermitFile: Buffer | null = null;
		let logoFileName: string | null = null;
		let businessPermitFileName: string | null = null;

		for (const field of formData) {
			if (field.name === 'logo' && field.data) {
				logoFile = field.data;
				logoFileName = `images/${Date.now()}_${field.filename}`;
			} else if (field.name === 'businessPermit' && field.data) {
				businessPermitFile = field.data;
				businessPermitFileName = `images/${Date.now()}_${field.filename}`;
			} else if (field.name === 'images' && field.data) {
				images.push({
					file: field.data,
					fileName: `images/${Date.now()}_${field.filename}`,
				});
			} else {
				fields[field.name as string] = field.data.toString('utf-8');
			}
		}
		// Validate required fields
		const requiredFields = ['name', 'email', 'password', 'contactNumber'];
		for (const field of requiredFields) {
			if (!fields[field]) {
				throw createError({
					statusCode: 400,
					statusMessage: 'bad request',
					message: `${field} is required`,
				});
			}
		}

		// Validate contact number
		let phoneNumber: string | undefined;
		if (
			!/^\d{10}$/.test(fields.contactNumber as string) ||
			!fields.contactNumber?.startsWith('9')
		) {
			throw createError({
				statusCode: 400,
				statusMessage: 'bad request',
				message:
					'Invalid contact number. Must be a 10-digit Philippine mobile number starting with 9.',
			});
		}
		phoneNumber = `+63${fields.contactNumber}`;

		// Create Firebase Auth User
		const user = await auth.createUser({
			displayName: fields.name,
			email: fields.email,
			phoneNumber,
			password: fields.password,
			disabled: true,
		});

		// Upload files to Firebase Storage
		let logoUrl: string | null = null;
		let businessPermitUrl: string | null = null;

		if (logoFile && logoFileName) {
			const logoFileRef = storage.file(logoFileName);
			await logoFileRef.save(logoFile, { contentType: 'image/png' });
			logoUrl = `https://storage.googleapis.com/${logoFileName}`;
		}

		if (businessPermitFile && businessPermitFileName) {
			const permitFileRef = storage.file(businessPermitFileName);
			await permitFileRef.save(businessPermitFile, {
				contentType: 'image/png',
			});
			businessPermitUrl = `https://storage.googleapis.com/${businessPermitFileName}`;
		}

		console.log('storage url', logoUrl, businessPermitUrl);

		// Save user data to Firestore
		const userRef = db.collection('queues').doc(user.uid);
		await userRef.set(
			{
				name: fields.name?.toLowerCase(),
				role: 'employer',
				password: '*******',
				email: fields.email,
				createdAt: Timestamp.now(),
				searchKeywords: generateSearchKeywords(
					fields.name?.toLowerCase() as string,
				),
				userCredentials: {
					companyName: fields.companyName ?? '',
					companyAddress: fields.companyAddress ?? '',
					website: fields.website ?? '',
					telephoneNumber: fields.telephoneNumber ?? '',
					numberBranches: fields.numberBranches ?? '',
					numberEmployees: fields.numberEmployees ?? '',
					field: fields.field ?? '',
					logo: logoUrl, // Store uploaded logo URL
					businessPermit: businessPermitUrl, // Store uploaded permit URL
					description: fields.description ?? '',
					position: fields.position ?? '',
					contactNumber: fields.contactNumber ?? '',
				},
			},
			{ merge: true },
		);

		return successResponse({
			message: 'Successfully created account',
			data: { uid: user.uid, email: fields.email },
		});
	} catch (error: any) {
		console.error('/employer.post', error);
		return errorResponse(error);
	}
});
