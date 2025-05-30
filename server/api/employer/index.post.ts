// server/api/upload.ts
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { H3Event, readMultipartFormData } from 'h3';
import successResponse from '~~/server/utils/okReponse';
import errorResponse from '~~/server/utils/errorResponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';
import { getApp } from 'firebase-admin/app';

export default defineEventHandler(async (event: H3Event) => {
	const app = getApp();
	const auth = getAuth();
	const db = getFirestore();
	const bucket = getStorage(app).bucket();

	try {
		const formData = await readMultipartFormData(event);

		if (!formData || formData.length === 0) {
			throw createError({
				statusCode: 204,
				statusMessage: 'No content',
				message: 'No content found',
			});
		}

		const fields: Record<string, string> = {};
		let logoUrl = '';
		let businessPermitUrl = '';
		let dtiUrl = '';

		for (const item of formData) {
			if (item.type && item.data) {
				// File field
				const filename = `${Date.now()}-${item.filename || 'unnamed'}`;
				const destination = `images/${filename}`;
				const buffer = Buffer.from(item.data);

				// Upload to Firebase Storage
				const storageFile = bucket.file(destination);
				await storageFile.save(buffer, { contentType: item.type });
				await storageFile.makePublic();
				const permanentUrl = storageFile.publicUrl();

				if (item.name === 'logo') logoUrl = permanentUrl;
				if (item.name === 'businessPermit') businessPermitUrl = permanentUrl;
				if (item.name === 'dti') dtiUrl = permanentUrl;
			} else {
				// Text field
				fields[item.name as string] = item.data.toString('utf8');
			}
		}

		// Validate contact number
		let phoneNumber: string | undefined;
		if (
			!fields.contactNumber ||
			!/^\d{10}$/.test(fields.contactNumber) ||
			!fields.contactNumber.startsWith('9')
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

		// Save user data to Firestore with image URLs
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
					logo: logoUrl || '',
					businessPermit: businessPermitUrl || '',
					dti: dtiUrl || '',
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
