import { MysqlCon } from '@/database/mysqlConnection';

export const verifyMagicLinkToken = async (email: string, token: string): Promise<boolean> => {
    const db = new MysqlCon();
    await db.open();

    const query = `
        SELECT expiration
        FROM MagicLinks
        WHERE email = ? AND token = ? AND expiration > NOW()
    `;

    try {
        const results = await db.selQuery(query, [email, token]);
        // If a record is found and not expired, it's valid
        return results.length > 0;
    } catch (error) {
        console.error('Database error verifying magic link token:', error);
        throw new Error('Failed to verify magic link token');
    } finally {
        await db.close();
    }
};
