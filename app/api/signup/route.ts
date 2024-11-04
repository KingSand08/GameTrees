import { NextRequest, NextResponse } from 'next/server';
import { registerCustomer } from '@/database/query/registerCustomer';

export async function POST(req: NextRequest) {
    try {
        // Parse JSON data from the request
        const { name, username, email, birthDay, phoneNum } = await req.json();

        // Call the database function to register a customer
        const userId = await registerCustomer(name, username, email, birthDay, phoneNum);

        // Return a successful JSON response with the userId
        return NextResponse.json({ userId }, { status: 200 });
    } catch (error) {
        console.error('Registration error:', error);

        // Return a JSON error response
        return NextResponse.json(
            { message: 'Registration failed. Please try again.' },
            { status: 500 }
        );
    }
}
