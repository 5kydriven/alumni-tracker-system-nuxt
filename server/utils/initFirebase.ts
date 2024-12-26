import { initializeApp, cert, getApp } from 'firebase-admin/app';
import type { ServiceAccount } from 'firebase-admin/app';

export default function initFirebase(firebaseConfig: any) {
	try {
		return getApp();
	} catch {
		return initializeApp({
			credential: cert(firebaseConfig as ServiceAccount),
		});
	}
}
// let app;
// if (!app) {
// 	app = initializeApp({
// 		credential: cert(firebaseConfig as ServiceAccount),
// 	});
// 	console.log('init firebaseAdmin');
// } else {
// 	console.log('firebaseAdmin not init');
// }
