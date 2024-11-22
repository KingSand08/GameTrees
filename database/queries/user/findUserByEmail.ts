import executeQuery from "@/database/mysqldb";
import { User } from "@/types/models/User";

// Check if a user exists based on email (for Google sign-in)
export const findUserByEmail = async (email: string): Promise<User[]> => {
    const query = `SELECT * FROM Users WHERE email = ?;`;
    const data = [email];
    return executeQuery(query, data) as Promise<User[]>;
};
