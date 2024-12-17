export interface Message {
	id: string;
	senderId: string;
	message: string;
	createdAt: string;
	readBy: Array;
}
