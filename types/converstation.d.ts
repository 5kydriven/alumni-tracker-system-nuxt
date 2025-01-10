declare global {
	interface conversations {
		id?: string;
		uid?: string;
		type?: conversationType;
		participants?: array;
		createdAt?: any;
		lastMessage?: lastMessage;
	}

	interface lastMessage {
		senderUid?: string;
		message?: string;
		createdAt?: any;
	}

	type conversationType = 'private' | 'group';
}

export { conversations, lastMessage, conversationType };
