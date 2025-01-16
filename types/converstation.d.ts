declare global {
	interface Conversations {
		id?: string;
		uid?: string;
		type?: ConversationType;
		isGroup?: boolean;
		participantName: string;
		participants?: array;
		createdAt?: any;
		lastMessage?: lastMessage;
	}

	interface LastMessage {
		senderUid?: string;
		message?: string;
		createdAt?: any;
		name?: string;
	}

	type ConversationType = 'private' | 'group';
}

export { Conversations, LastMessage, ConversationType };
