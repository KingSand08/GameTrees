import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicLinkToken } from '@/database/query/verifyMagicLinkToken';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
        return NextResponse.json({ message: 'Invalid link' }, { status: 400 });
    }

    const isValid = await verifyMagicLinkToken(email, token);

    if (!isValid) {
        return NextResponse.json({ message: 'Magic link is invalid or expired' }, { status: 400 });
    }

    // Set a session cookie or JWT (depends on your session strategy)
    // For demonstration, return a success response
    return NextResponse.json({ message: 'Login successful' });
}
