export declare global {
	interface H3Response {
		status?: number;
		message?: string;
		body?: any;
		statusCode?: number;
		statusMessage?: StatusMessage;
	}

	type StatusMessage = 'success' | 'error' | null;
}
