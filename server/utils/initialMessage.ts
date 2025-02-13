export default function initialMessage(jobDetails: Job, alumniName: string) {
	return `Hi ${jobDetails.contactPerson},

					I’m interested in the ${jobDetails.title} position at ${jobDetails.companyName} and would love the opportunity to be part of your team. I have submitted my application through the platform, and you can find my details attached. Let me know if you need any more information! Looking forward to your response.

					Thanks!
					${alumniName}`;
}
