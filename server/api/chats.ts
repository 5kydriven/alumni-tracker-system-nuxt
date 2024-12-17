const chats = [
	{
		participants: ['1', '2'],
		type: 'private',
		last_message: {
			content: 'lorem ipsum...',
			messsage_id: '1',
			sent_at: 'November 29, 2024',
		},
	},
	{
		participants: ['1', '2', '3'],
		type: 'group',
		last_message: {
			content: 'lorem ipsum lorem',
			messsage_id: '1',
			sent_at: 'November 28, 2024',
		},
	},
];

export default eventHandler(async () => {
	return chats;
});
