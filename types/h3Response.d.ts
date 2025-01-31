export declare global {
	interface H3Response<T = any> {
		status?: number;
		message?: string;
		body?: any;
		statusCode?: number;
		statusMessage?: StatusMessage;
		data?: T;
		total?: number;
	}

	type StatusMessage =
		| 'ok' // 200
		| 'created' // 201
		| 'accepted' // 202
		| 'no content' // 204
		| 'bad request' // 400
		| 'unauthorized' // 401
		| 'forbidden' // 403
		| 'not found' // 404
		| 'method not allowed' // 405
		| 'conflict' // 409
		| 'unprocessable entity' // 422
		| 'internal server error' // 500
		| 'not implemented' // 501
		| 'service unavailable' // 503
		| null;
}
