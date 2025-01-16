declare global {
	interface Message {
		id?: string;
		senderUid?: string;
		message?: string;
		createdAt?: any;
		readBy?: Array;
		name?: string;
	}
}

export { Message };
