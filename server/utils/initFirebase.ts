import { initializeApp, cert, getApp } from 'firebase-admin/app';
import type { ServiceAccount } from 'firebase-admin/app';

export default function initFirebase(firebaseConfig: any) {
	try {
		return getApp();
	} catch {
		return initializeApp({
			credential: cert(firebaseConfig as ServiceAccount),
			storageBucket: 'alumni-tracker-d7448.firebasestorage.app',
		});
	}
}
