export const useChatStore = defineStore('chatStore', () => {
	const chats = ref([
		{
			name: 'ilyn inodeo',
			message: 'Hello world',
			date: 'Jan 7',
			uid: '1',
		},
	]);
	const messages = ref([
		{
			content: 'My Message',
			uid: '1',
		},
		{
			content: 'My MEssage',
			uid: '1',
		},
		{
			content: 'from sender',
			uid: '2',
		},
	]);

	function storeMessage(payload: any) {
		messages.value.push(payload);
	}

	return {
		chats,
		messages,
		storeMessage,
	};
});
