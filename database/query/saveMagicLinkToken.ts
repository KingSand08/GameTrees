import { MysqlCon } from '@/database/mysqlConnection';

/**
 * Saves a magic link token and expiration in the database.
 */
export const saveMagicLinkToken = async (email: string, token: string, expiration: Date) => {
    const db = new MysqlCon();
    await db.open();

    const query = 'INSERT INTO MagicLinks (email, token, expiration) VALUES (?, ?, ?)';

    try {
        await db.exQuery(query, [email, token, expiration]);
    } catch (error) {
        console.error('Database error saving magic link token:', error);
        throw new Error('Failed to save magic link token');
    } finally {
        await db.close();
    }
};
