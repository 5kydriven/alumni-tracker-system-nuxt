export declare global {
	interface H3Response {
		status?: number;
		message?: string;
		body?: any;
		statusCode?: number;
		statusMessage?: StatusMessage;
		data?: any;
	}

	type StatusMessage = 'success' | 'error' | null;
}
