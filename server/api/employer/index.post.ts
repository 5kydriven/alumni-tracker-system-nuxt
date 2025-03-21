import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { H3Event } from 'h3';
import generateSearchKeywords from '~~/server/utils/searchKeywords';

export default defineEventHandler(async (event: H3Event) => {
	const auth = getAuth();
	const db = getFirestore();
	const body = await readBody<User<EmployerCredentials>>(event);
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
			phoneNumber: `+63${body.userCredentials?.contactNumber}`,
			password: body.password,
			disabled: true,
		});

		const usersRef = await db
			.collection('queues')
			.doc(user.uid)
			.set(
				{
					name: body.name?.toLowerCase(),
					role: 'employer',
					password: '*******',
					email: body.email,
					createdAt: Timestamp.now(),
					searchKeywords: generateSearchKeywords(
						body.name?.toLowerCase() as string,
					),
					userCredentials: {
						companyName: body.userCredentials?.companyName,
						companyAddress: body.userCredentials?.companyAddress,
						website: body.userCredentials?.website,
						telephoneNumber: body.userCredentials?.telephoneNumber,
						numberBranches: body.userCredentials?.numberBranches,
						numberEmployees: body.userCredentials?.numberEmployees,
						field: body.userCredentials?.field,
						// logo: body.logo,
						// bussinessPermit: body.bussinessPermit,
						description: body.userCredentials?.description,
						position: body.userCredentials?.position,
						contactNumber: body.userCredentials?.contactNumber,
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
