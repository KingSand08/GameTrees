import type { NextApiRequest, NextApiResponse } from 'next';
import { registerCustomer } from '@/database/query/registerCustomer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, username, email, birthDay, phoneNum } = req.body;

        try {
            const userId = await registerCustomer(name, username, email, birthDay, phoneNum);
            res.status(200).json({ userId });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ message: 'Registration failed. Please try again.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
