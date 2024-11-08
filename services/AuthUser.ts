import { mysqlConn } from "@/database/mysqlConnection"; // Adjust the import path if necessary

export const createUser = async (userId: string, email: string, hashedPassword: string): Promise<void> => {
    const query = 'INSERT INTO user (user_id, user_email, hashed_password) VALUES (?, ?, ?)';
    await mysqlConn.exQuery(query, [userId, email, hashedPassword]);
};

export const getUserById = async (userId: string): Promise<unknown | null> => {
    const query = 'SELECT * FROM user WHERE user_id = ?';
    const rows = await mysqlConn.selQuery(query, [userId]);
    return rows.length > 0 ? rows[0] : null;
};

export const createUserSession = async (userId: string, sessionId: string, expiresAt: Date): Promise<void> => {
    const query = 'INSERT INTO user_session (user_id, session_id, expires_at) VALUES (?, ?, ?)';
    await mysqlConn.exQuery(query, [userId, sessionId, expiresAt]);
};

export const getUserSession = async (sessionId: string): Promise<unknown | null> => {
    const query = 'SELECT * FROM user_session WHERE session_id = ?';
    const rows = await mysqlConn.selQuery(query, [sessionId]);
    return rows.length > 0 ? rows[0] : null;
};
