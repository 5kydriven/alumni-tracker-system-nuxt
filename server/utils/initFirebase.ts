import { initializeApp, cert, getApp } from 'firebase-admin/app';
import type { ServiceAccount } from 'firebase-admin/app';

const firebaseConfig = {
	type: 'service_account',
	project_id: 'alumni-tracker-d7448',
	private_key_id: 'e9a8a2294db27fbc7d872bafc2355c23f4d786c1',
	private_key:
		'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMISSSezzlUFCK\nrJrSuP4WijMj5qrEf58ChAzSJ476oVU8bI07Q5yVu0Q+f4nuNhTn/mzEhv57iDBm\nLkKFjr2V6B6QO1tYffwUSp6JLnupKHtb7W5MORdxqS3r3EIeykuIR37yNq5llS0h\nvQyXZVgEtwbZAMK6DzfzBQy9/4UL97MHPbhohvrFgCtq5GCRdcKUuDby8xQ2BqOz\nFZ248FFuBnQLeZ2uadIFTptxfvakXULJc+XMFHyM9J22TafZ2qtic4nwXCT/vifL\nZbP2HCasbrAQm5YybzJzaSKSwI9ck4k1w7W4CrbNGVXODd1Pq4JdbVVBQ/q0BYYl\n/EiGmZQPAgMBAAECggEAVX9eO5Itj9iDW4nu8Oq11cf9ooBXLyVK+vlHC3CxNK2F\nL2FCCDwJ5jcA3vJ5WZJCUGcitG/cP+5rYyjmCN2f751Ay+VonZhrEC6u10NmXRQN\nExRP2dIhzSPwjXT8JrxRRZu4goe/pOGF/TcbAoBajOMCFbr5VIfSRdHsI9pVpgxR\nOAWf8bfiz7en99hyxR+qL2QLM8BAiO+F/AUMpDxMQkZYInPk+P87180CaBFvXb22\n2H/azd/zzbe78OZZMKcunFlVEfnSC+aylKii89yZ2mNFyvZwwwRgkW/2LTWQInO4\nZPVLgLECv7BK6bRxf0AD1Ou+fvzgkjO3OXM6euysXQKBgQD/r3HW6orTD9PlsZP7\nFYMpqLMJm+VO1unddKUaWL1wjc5MwlIf07KYz9GGBEB4U61pK+ueevzE8ikmyGSM\n0cX56ca3ZQ+RhPnqUvZ8/OzoOPxCT7yAvPHAyUMVGc/e67Mnmu5y3gvX9eQ2Pptn\nyzt2tcDYKD+/5qeq1Cc2aTUNEwKBgQDMYXSFwGhrETqNKHSSXazj7EGDH+Aq83DQ\nTUSTbG0M/itmlHyMI3LvCYa01/0iymvY3gVxYpwLlLyviclIoJ8jc5L9VHd2Zfnk\n3jkxC+zSFJa/fHYhD6ffcf2Ul/6H4Y1zBkdUmXZzqEEY4f6q4oLYruHaozRKs+J9\nfeA0+FoolQKBgCrRV7AVAQCNcv/ROCXhGWD9llXynHkSdoGWihuaZscViEnEdPpN\nemgqzTyzM5Sy9qRZLZERqYjVwNx0zJnke1H5u0R1ESFecneyQwL1XDsbZ+s27Stl\n+No/GhPLicscD5l/UZU86CDXVctbuqysFR4xG8VXIC3j04pBEvwCrFavAoGAPbKN\nwnK7Etc4nbRAvI6aypNfk33j5hNnUvqAYSCyKuHvqB/bGVL6Nz7g82bge8gvlmAv\ntHLYOIbGDxfBM7OJVuJk1STSi2NtdLHBAhVfgGvGtjeUUZawTrvSmTDpHYvxb2/N\nyLQrFe8M974BawTGCzN/6sip2INFNCzzqgnu7aECgYEAsZIyzVlohvzlURq772Xl\nRFxHRgb2JGfVCgc3RuLR3KVbqKh8Csj2iU7w2yWuP84rUw5ZeYGJ7bLwmIWCv6ng\nGocv1e/nRx2Rj21euKkRUS7JZ54nKCokZnDodvXrfi9ES9ewF/v7P87uW782ebyw\ngWQVNQhko6lUmvFZ8xE8ZCY=\n-----END PRIVATE KEY-----\n',
	client_email:
		'firebase-adminsdk-37wak@alumni-tracker-d7448.iam.gserviceaccount.com',
	client_id: '102690450067046051213',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-37wak%40alumni-tracker-d7448.iam.gserviceaccount.com',
	universe_domain: 'googleapis.com',
};

export default function initFirebase() {
	try {
		return getApp();
	} catch {}
	return initializeApp({
		credential: cert(firebaseConfig as ServiceAccount),
	});
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
