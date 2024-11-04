import { MysqlCon } from "@/database/mysqlConnection";
import { ResultSetHeader } from "mysql2/promise";

/**
 * Registers a new user in the database.
 * @returns The ID of the newly registered user.
 */
export const registerCustomer = async (
    name: string,
    username: string,
    email: string,
    birthDay: string,
    phoneNum: string
): Promise<number> => {
    const db = new MysqlCon();
    await db.open(); // Open a connection

    const query = 'INSERT INTO Users (name, username, email, birthdate, phoneNum) VALUES (?, ?, ?, ?, ?)';

    try {
        // Execute the insert query with provided values
        const result: ResultSetHeader = await db.exQuery(query, [name, username, email, birthDay, phoneNum]);

        // Return the inserted user ID on success
        return result.insertId;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Failed to insert new user.");
    } finally {
        // Ensure the connection is closed after the query
        await db.close();
    }
};
