declare global {
	interface PaginatedResponse<T = any> {
		data?: T;
		total?: number;
	}
}

export { PaginatedResponse };
