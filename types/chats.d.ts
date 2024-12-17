import type { Message } from './message';

export interface Chats {
	id: string;
	participants: Array;
	lastMessage?: Object;
	createdAt: string;
	type: string;
	messages: Message;
	groupName?: string;
	createdBy?: string;
}
