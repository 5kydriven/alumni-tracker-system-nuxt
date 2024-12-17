const messages = [
	{
		id: 1,
		name: 'Alex Smith',
		sender_id: 'John',
		from: {
			email: 'alex.smith@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=1',
			},
		},
		date: '01 Jan',
		message:
			"Hi there, just a quick reminder about our meeting scheduled for 10 AM tomorrow. We'll be discussing the new marketing strategies and I would really appreciate your input on the matter. Looking forward to a productive session.",
	},
	{
		id: 2,
		unread: true,
		name: 'Jordan Brown',
		from: {
			email: 'jordan.brown@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=2',
			},
		},
		date: '01 Jan',
		message:
			"I wanted to provide you with the latest update on the project. We've made significant progress on the development front and I've attached a detailed report for your review. Please let me know your thoughts and any areas for improvement.",
	},
	{
		id: 3,
		unread: true,
		name: 'Taylor Green',
		from: {
			email: 'taylor.green@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=3',
			},
		},
		date: '01 Jan',
		message:
			'Hey! I was wondering if you would like to grab lunch this Friday. I know a great spot downtown that serves the best Mexican cuisine. It would be a great opportunity for us to catch up and discuss the upcoming team event.',
	},
	{
		id: 4,
		name: 'Morgan White',
		from: {
			email: 'morgan.white@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=4',
			},
		},
		date: '01 Jan',
		message:
			"I've attached the new proposal for our next project. It outlines all the objectives, timelines, and resource allocations. I'm particularly excited about the innovative approach we're taking this time. Please have a look and let me know your thoughts.",
	},
	{
		id: 5,
		name: 'Casey Gray',
		from: {
			email: 'casey.gray@example.com',
		},
		date: '01 Jan',
		message:
			"Your travel itinerary for the upcoming business trip is ready. I've included all flight details, hotel reservations, and meeting schedules. Please review and let me know if there are any changes you would like to make or any additional arrangements needed.",
	},
	{
		id: 6,
		name: 'Jamie Johnson',
		from: {
			email: 'jamie.johnson@example.com',
		},
		date: '01 Jan',
		message:
			"I've completed the budget report for this quarter. It includes a detailed analysis of our expenditures and revenue, along with projections for the next quarter. I believe there are some areas where we can optimize our spending. Let's discuss this in our next finance meeting.",
	},
	{
		id: 7,
		name: 'Riley Davis',
		from: {
			email: 'riley.davis@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=7',
			},
		},
		date: '01 Jan',
		message:
			"Just a reminder about the training session scheduled for next week. We'll be covering new software tools that are crucial for our workflow. It's important that everyone attends as this will greatly enhance our team's efficiency. Please confirm your availability.",
	},
	{
		id: 8,
		unread: true,
		name: 'Kelly Wilson',
		from: {
			email: 'kelly.wilson@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=8',
			},
		},
		date: '01 Jan',
		message:
			'Happy Birthday! Wishing you a fantastic day filled with joy and laughter. Your dedication and hard work throughout the year have been invaluable to our team. Enjoy your day to the fullest!',
	},
	{
		id: 9,
		name: 'Drew Moore',
		from: {
			email: 'drew.moore@example.com',
		},
		date: '01 Jan',
		message:
			'We are in the process of revamping our company website and I would greatly appreciate your feedback on the new design. Your perspective is always insightful and could help us enhance the user experience significantly. Please let me know a convenient time for you to discuss this.',
	},
	{
		id: 10,
		name: 'Jordan Taylor',
		from: {
			email: 'jordan.taylor@example.com',
		},
		date: '01 Jan',
		message:
			"This is a friendly reminder that your gym membership is due for renewal at the end of this month. We've added several new classes and facilities that I think you'll really enjoy. Let me know if you would like a tour of the new facilities.",
	},
	{
		id: 11,
		unread: true,
		name: 'Morgan Anderson',
		from: {
			email: 'morgan.anderson@example.com',
		},
		date: '01 Jan',
		message:
			"I'm writing to inform you that your insurance policy details have been updated. The new document outlines the changes in coverage and premium rates. It's important to review these changes to ensure they meet your needs. Please don't hesitate to contact me if you have any questions.",
	},
	{
		id: 12,
		name: 'Casey Thomas',
		from: {
			email: 'casey.thomas@example.com',
		},
		date: '01 Jan',
		message:
			"I'm excited to remind you about our next book club meeting scheduled for next Thursday. We'll be discussing 'The Great Gatsby,' and I'm looking forward to hearing everyone's perspectives. Also, we will be choosing our next book, so bring your suggestions!",
	},
	{
		id: 13,
		name: 'Jamie Jackson',
		from: {
			email: 'jamie.jackson@example.com',
		},
		date: '01 Jan',
		message:
			"Don't forget to send in your favorite recipe for our upcoming recipe exchange. It's a great opportunity to share and discover new and delicious meals. I'm particularly excited to try out new dishes and add some variety to my cooking.",
	},
	{
		id: 14,
		name: 'Riley White',
		from: {
			email: 'riley.white@example.com',
		},
		date: '01 Jan',
		message:
			"The new schedule for yoga classes is now available. We've added some new styles and adjusted the timings to accommodate more participants. I believe these classes are a great way to relieve stress and stay healthy. Hope to see you there!",
	},
	{
		id: 15,
		name: 'Kelly Harris',
		from: {
			email: 'kelly.harris@example.com',
		},
		date: '01 Jan',
		message:
			"I'm thrilled to invite you to my book launch event next month. It's been a journey writing this book    and I'm eager to share it with you. The event will include a reading session, Q&A, and a signing opportunity. Your support would mean a lot to me.",
	},
	{
		id: 16,
		name: 'Drew Martin',
		from: {
			email: 'drew.martin@example.com',
		},
		date: '01 Jan',
		message:
			"Join us at the upcoming tech conference where we will be discussing the latest trends and innovations in technology. This is a great opportunity to network with industry leaders and learn about cutting-edge developments. Your participation would greatly contribute to our team's knowledge and growth.",
	},
	{
		id: 17,
		name: 'Alex Thompson',
		from: {
			email: 'alex.thompson@example.com',
		},
		date: '01 Jan',
		message:
			"I wanted to invite you to check out the new art exhibition this weekend. It features some amazing contemporary artists and their latest works. It's a great opportunity to immerse yourself in the local art scene and get inspired. Let me know if you're interested in going together.",
	},
	{
		id: 18,
		name: 'Jordan Garcia',
		from: {
			email: 'jordan.garcia@example.com',
		},
		date: '01 Jan',
		message:
			"I'm looking forward to seeing you at the networking event next week. It's a great chance to connect with professionals from various industries and expand our professional network. There will also be guest speakers discussing key business trends. Your presence would add great value to the discussions.",
	},
	{
		id: 19,
		name: 'Taylor Rodriguez',
		from: {
			email: 'taylor.rodriguez@example.com',
		},
		date: '01 Jan',
		message:
			"We're looking for volunteers for the upcoming community event. It's a great opportunity to give back and make a positive impact. There are various roles available, so you can choose something that aligns with your interests and skills. Let me know if you're interested and I'll provide more details.",
	},
	{
		id: 20,
		name: 'Morgan Lopez',
		from: {
			email: 'morgan.lopez@example.com',
		},
		date: '01 Jan',
		message:
			"Just a reminder that your car is due for service next week. Regular maintenance is important to ensure your vehicle's longevity and performance. I've included the details of the service center and the recommended services in this email. Feel free to contact them directly to schedule an appointment.",
	},
];

export default eventHandler(async () => {
	return messages;
});
