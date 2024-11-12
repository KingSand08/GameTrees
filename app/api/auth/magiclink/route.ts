// /app/api/auth/magiclink/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { sendMagicLinkEmail } from '@/app/utils/sendMagicLinkEmail';
import crypto from 'crypto';
import { saveMagicLinkToken } from '@/database/query/saveMagicLinkToken';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Generate a unique token and expiration time
        const token = crypto.randomBytes(32).toString('hex');
        const expiration = new Date(Date.now() + 15 * 60 * 1000); // 15-minute expiration

        // Store the token in the database
        await saveMagicLinkToken(email, token, expiration);

        // Create and send the magic link email
        const magicLinkUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}&email=${email}`;
        await sendMagicLinkEmail(email, magicLinkUrl);

        return NextResponse.json({ message: 'Magic link sent successfully' });
    } catch (error) {
        console.error('Error generating magic link:', error);
        return NextResponse.json({ message: 'Failed to send magic link' }, { status: 500 });
    }
}
