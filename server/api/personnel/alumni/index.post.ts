import successResponse from '~~/server/utils/okReponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';
import { H3Event } from 'h3';
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import sanitizeString from '~~/server/utils/snitizeString';

interface AlumniData {
	firstname?: string;
	lastname?: string;
	middlename?: string;
	course?: string;
	batch?: string;
}

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const body = await readBody<AlumniData[]>(event);
	try {
		if (!body) {
			throw createError({
				statusCode: 204,
				statusMessage: 'no content',
				message: 'Body has no content',
			});
		}
		const batch = db.batch();
		const password = '123456';

		const result = await Promise.all(
			body.map(async (item) => {
				const fullname =
					item.firstname + ' ' + item.middlename + ' ' + item.lastname;
				const name = fullname.replace('�', 'ñ').trim().split(' ');
				const lastName = sanitizeString(name[name.length - 1] || 'unknown');
				const scrambledLastName = scrambleString(lastName as string);

				const email = `${scrambledLastName.toLowerCase()}${
					item.batch ?? ''
				}cpsu@example.com`;

				const userCreds = await getAuth().createUser({
					email,
					password,
					displayName: fullname,
				});

				const accountRolesDocRef = db.collection('users').doc(userCreds.uid);
				batch.set(
					accountRolesDocRef,
					{
						role: 'alumni',
						email,
						password,
						name: fullname.toLowerCase(),
						firstname: item.firstname?.toLowerCase(),
						lastname: item.lastname?.toLowerCase(),
						middlename: item.middlename?.toLowerCase(),
						searchKeywords: generateSearchKeywords(fullname.toLowerCase()),
						createdAt: Timestamp.now(),
						updatedAt: Timestamp.now(),
						isUpdated: false,
						userCredentials: {
							status: 'unknown',
							course: item.course?.toUpperCase(),
							batch: item.batch,
							description: null,
						},
					},
					{ merge: true },
				);

				return {
					...item,
					email,
					password,
					uid: userCreds.uid,
				};
			}),
		);

		const batchValue = body[0]?.batch;
		const analyticsRef = db.collection('analytics').doc(batchValue as string);
		batch.set(
			analyticsRef,
			{
				year: Number(batchValue),
				employed: FieldValue.increment(0),
				unemployed: FieldValue.increment(0),
				unknown: FieldValue.increment(body.length),
			},
			{ merge: true },
		);

		await batch.commit();
		const cache = useStorage('cache');
		await cache.clear();

		return successResponse({
			message: 'Successfully created alumni',
			data: result,
		});
	} catch (error: any) {
		console.error('/personnel/alumni.post', error);
		if (error.code === 'auth/email-already-exists') {
			throw createError({
				statusCode: 409,
				statusMessage: 'conflict',
				message: 'Email already exists',
				data: error,
			});
		}
		return errorResponse(error);
	}
});
