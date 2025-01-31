export default function errorResponse(error: any) {
	return {
		statusCode: error.statusCode || 500,
		statusMessage: error.statusMessage || 'internal server error',
		message: error.message,
	} as H3Response;
}
