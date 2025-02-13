import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import type { Employer } from '~~/types/employer';

export default defineEventHandler(async (event: H3Event) => {
	const auth = getAuth();
	const db = getFirestore();
	const body = await readBody<Employer>(event);
	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'No content found',
			});
		}

		const user = await auth.createUser({
			displayName: body.name,
			email: body.email,
			phoneNumber: `+63${body.contactNumber}`,
			password: body.password,
			disabled: true,
		});

		const usersRef = await db
			.collection('users')
			.doc(user.uid)
			.set(
				{
					name: body.name,
					role: 'employer',
					password: '*******',
					email: body.email,
					createdAt: Timestamp.now(),
					isAccepted: false,
					userCredentials: {
						companyName: body.companyName,
						companyAddress: body.companyAddress,
						website: body.website,
						telephoneNumber: body.telephoneNumber,
						numberBranches: body.numberBranches,
						numberEmployees: body.numberEmployees,
						field: body.field,
						// logo: body.logo,
						// bussinessPermit: body.bussinessPermit,
						description: body.description,
						position: body.position,
						contactNumber: body.contactNumber,
					},
				},
				{ merge: true },
			);

		return {
			statusCode: 200,
			statusMessage: 'ok',
			data: [user, usersRef],
		} as H3Response;
	} catch (error: any) {
		console.log('/employer.post', error);
		return errorResponse(error);
	}
});
