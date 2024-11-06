import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
// import { sql } from '@vercel/postgres';
// import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { MysqlCon } from './database/mysqlConnection';

// async function getUser(email: string): Promise<User | undefined> {
//     try {
//         const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//         return user.rows[0];
//     } catch (error) {
//         console.error('Failed to fetch user:', error);
//         throw new Error('Failed to fetch user.');
//     }
// }

async function getUserByEmail(email: string): Promise<User | undefined> {
    const db = new MysqlCon();

    try {
        await db.open();

        const query = `SELECT * FROM users WHERE email = ?`;
        const rows = await db.selQuery(query, [email]);

        // Return the first row if it exists
        return rows[0] as User | undefined;
    } catch (error) {
        console.error('Failed to fetch user by email:', error);
        throw new Error('Failed to fetch user by email.');
    } finally {
        await db.close();
    }
}


export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
