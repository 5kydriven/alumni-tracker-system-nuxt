import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const { sendMail } = useNodeMailer();
	try {
		return sendMail({
			subject: 'Nuxt + nodemailer',
			text: 'Hello from nuxt-nodemailer!',
			to: 'tagpuno.cpsu@gmail.com',
		});
	} catch (error: any) {
		return errorResponse(error);
	}
});
