import successResponse from '~~/server/utils/okReponse';
import generateSearchKeywords from '~~/server/utils/searchKeywords';
import { H3Event } from 'h3';
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import sanitizeString from '~~/server/utils/snitizeString';
import iconv from 'iconv-lite';
import pkg from 'papaparse';
const { parse } = pkg;

interface AlumniData {
	firstname?: string;
	lastname?: string;
	middlename?: string;
	course?: string;
	batch?: string;
}

export default defineEventHandler(async (event: H3Event) => {
	const db = getFirestore();
	const auth = getAuth();
	const formData = await readMultipartFormData(event);

	if (!formData) {
		throw createError({
			statusCode: 400,
			statusMessage: 'bad request',
			message: 'Invalid form data',
		});
	}

	const file = formData.find((item) => item.name === 'file');
	if (!file || !file.filename) {
		throw createError({
			statusCode: 400,
			statusMessage: 'bad request',
			message: 'File is required',
		});
	}

	try {
		// Pre-process CSV data
		const csvString = await preprocessCSV(file.data);
		const { data } = parse<AlumniData>(csvString, {
			header: true,
			skipEmptyLines: true,
			transformHeader: (header) => header.trim().toLowerCase(),
		});

		const batchSize = 300;
		const totalBatches = Math.ceil(data.length / batchSize);

		// Process batches in parallel with limited concurrency
		const concurrencyLimit = 5;
		const batchPromises = [];

		for (let i = 0; i < totalBatches; i++) {
			const chunk = data.slice(i * batchSize, (i + 1) * batchSize);

			batchPromises.push(processBatch(chunk, db, auth));

			// Control concurrency
			if (batchPromises.length >= concurrencyLimit || i === totalBatches - 1) {
				await Promise.all(batchPromises);
				batchPromises.length = 0;
			}
		}

		// Update analytics
		await updateAnalytics(db, data);

		// Clear cache
		await useStorage('cache').clear();

		return successResponse({
			message: 'Successfully created alumni',
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
		throw error;
	}
});

// Helper functions
async function preprocessCSV(data: Buffer): Promise<string> {
	let csvString = iconv.decode(data, 'utf-8');
	if (csvString.includes('�')) {
		csvString = iconv.decode(data, 'latin1');
	}
	return csvString;
}

async function processBatch(chunk: AlumniData[], db: any, auth: any) {
	const batch = db.batch();
	const password = '123456';

	// Pre-process all users first
	const usersToCreate = chunk.map((item) => {
		const fullname = `${item.firstname || ''} ${item.middlename || ''} ${
			item.lastname || ''
		}`.trim();
		const nameParts = fullname.split(' ');
		const lastName = sanitizeString(
			nameParts[nameParts.length - 1] || 'unknown',
		);
		const scrambledLastName = scrambleString(lastName);
		const email = `${scrambledLastName.toLowerCase()}${
			item.batch ?? ''
		}cpsu@example.com`;

		return { fullname, email, item };
	});

	// Create all auth users in parallel
	const userCredsPromises = usersToCreate.map(
		({ email, fullname }) =>
			auth
				.createUser({
					email,
					password,
					displayName: fullname,
				})
				.catch((error: any) => ({ error, email })), // Handle individual errors
	);

	const userCredsResults = await Promise.all(userCredsPromises);

	// Process successful creations
	usersToCreate.forEach(({ fullname, email, item }, index) => {
		const userCreds = userCredsResults[index];
		if (userCreds?.uid) {
			const docRef = db.collection('users').doc(userCreds.uid);
			const educRef = db
				.collection('users')
				.doc(userCreds.uid)
				.collection('education');
			batch.set(
				docRef,
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
						status: 'unemployed',
						course: item.course?.toUpperCase(),
						batch: item.batch,
						description: null,
					},
				},
				{ merge: true },
			);
			batch.add(educRef, {
				createdAt: Timestamp.now(),
				schoolName: 'Central Philippines State University',
				schoolAddress: 'San Carlos City',
				endDate: item.batch,
				startDate: 'unknown',
			});
		}
	});

	await batch.commit();
}

async function updateAnalytics(db: any, data: AlumniData[]) {
	const batchValue = data[0]?.batch;
	if (!batchValue) return;

	const analyticsRef = db.collection('analytics').doc(batchValue);
	await analyticsRef.set(
		{
			year: Number(batchValue),
			employed: FieldValue.increment(0),
			unemployed: FieldValue.increment(0),
			unknown: FieldValue.increment(data.length),
		},
		{ merge: true },
	);
}
