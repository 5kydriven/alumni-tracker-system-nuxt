import initFirebase from '../utils/initFirebase';

export default defineNitroPlugin((nuxtapp) => {
	const firebaseConfig = {
		type: 'service_account',
		project_id: 'alumni-tracker-d7448',
		private_key_id: '8328814ff99914549a3b93ee7052faea07125963',
		private_key:
			'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDZs1n5DEJjuflC\nrvuGzUB7Ye38uGOFreEus2bg76VjwUKlWDi558PgW68aGLbBA7DsSDCnUR4v+Rt3\nJ/cjqv+uqYzPLDAHM7MBudAgBRY/xZyma2UDramzRszOajlQkJ79mHVNb5cXoLFB\nvfO0fsx3pMF10zcPBj/OIS+InOHZkYp77EoqCe95Bk+H3iU8dRtQ+ZC6c1/nbZ2r\nOlB1gVuy7+4YTAWb+P2okc28Gm5JhBK2Tlsdb+BpBkEuydcnebuyohkB8ZqJLysW\nvd+8DBkGRVvRnQN8sExbBm9bnaS/y36dLeufA6r0NV2E2i4kEKgAAtO3zP8jmdGF\nnyyfjI5fAgMBAAECggEAM642H79fS1ls6P2tTHURZ7j5zFLhnWyH1pRUSfXaJ3JL\npgDphoiUoYBicymGyQ9dQtpoYnAJYI4cjQ75xofjps0tVklBJZSKXFCGLfPHMmBx\nLbi1BEiHzr1yBVaGQK/0bnNw9W8WSU+mhNrZLfIkDAsauiPoIDL1lrOeGypTG1jX\nWNXNt2YAnxEGdwQNqG30ZZRLyNVBWJf6UVEwxPIRV31kh/Yf3yDhTTPiC6BLSC/1\nArjVacTwrQlHlSMgjM1pXkQEm8/yBNaIjHRz5++hD2gHEjhOsouc6on82aSmfxyx\nkLMl1up8iZZaa+HABdwsi7+dlR0mcMcL40g7HbzHcQKBgQD8J25u6kTzXury2/uo\n5QrS4RMRXF2dop15QBr2rnNFGKzV0Y6heEZqG++F11wtykD9Cma8uUqYCxAkENQU\nz0ZprvsKeDt7lrZ4SktQ9w9W+zDc3/GENJpn4jrrkNB7SDolrXvWTwC9qjpTaecG\nTq9ggSzI1q1aO9UGOw9QwCGvdQKBgQDdBWRgLqDiFhCbwezfuBNbPGLfHU2BAzQS\nfpzdWJC7lVBKgZp6M2puuQJBlUMXUeSVN09x2vEU3VpxhaUapA5+BOFbe3Pgq5N/\nHXQIXL0pQxs8ALg3yfkB0wRTdGxXUDjHIEH8Zjg/qMbxtzt9zGzsJBpfcZ2Pz9G/\n1V7iMRmAAwKBgQDyqoQWDDElQmC8LsdH6H19KwyttYWGsjv4t5/7bTIT+kZDVHR+\nowCpF49w8CyPCMl4fG0ZDP1jy6nR+7wO9ted179TeRhNvWKH64AGQG4r2HxS5NZK\n1FEQzuDDWc+6BW2oWwgF3GwrG8scAZxLLqiLKGXQNwIIB/LgFzCLFwyUDQKBgAo9\nIbVC87kFhKdyiGKkyGDFn17uoJSFbXgd3W5zl+DYvet1rY5Tq26Nq4kWPRFrfcdb\n1JZVqi1pQ7NWmZtuVi2IVFhEk82opSCSYLmyciDjNvPEpMQQ2zQ2blDfZ9Vzpe2z\nlNr4cUqhqvWvo1XkjncyBPa+8Kmk2vakD80ysRe5AoGBANEIWUX3/CipnW9JDEx1\nUxDqO03FbWXYwD6ais0OYIrYKmkkJwDHND5ePhU47H7MKwrjrQoG8DKbW/riJMLr\nwXNs1yWoa4PyqJs+8jRejs3hVYl+yKkCzkVCdIEictWfdDgP6qUfHtLvNdV9U/2z\n9fbD84SQAZ+FrrVLJksb4Fr5\n-----END PRIVATE KEY-----\n',
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
	initFirebase(firebaseConfig);
});
