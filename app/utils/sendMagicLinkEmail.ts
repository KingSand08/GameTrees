// /app/utils/sendMagicLinkEmail.ts
import Mailjet from 'node-mailjet';

const mailjetClient = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY || '',
    apiSecret: process.env.MAILJET_SECRET_KEY || ''
});

export const sendMagicLinkEmail = async (email: string, magicLinkUrl: string) => {
    try {
        const request = mailjetClient
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.MAILJET_SENDER_EMAIL || '',
                            Name: 'Your App Name', // Customize with your app name or project name
                        },
                        To: [
                            {
                                Email: email,
                            },
                        ],
                        Subject: 'Your Magic Link for Login',
                        TextPart: `Click the link below to log in:\n\n${magicLinkUrl}`,
                        HTMLPart: `<p>Click the link below to log in:</p><p><a href="${magicLinkUrl}">${magicLinkUrl}</a></p>`,
                    },
                ],
            });

        const result = await request;
        console.log('Magic link email sent successfully:', result.body);
    } catch (error) {
        console.error('Error sending magic link email:', error);
        throw new Error('Could not send magic link email.');
    }
};
