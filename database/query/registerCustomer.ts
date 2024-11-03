import { MysqlCon } from "@/database/mysqlConnection"; // Adjust the import path as needed
import { ResultSetHeader } from "mysql2/promise";

/**
 * Registers a new user in the database.
 * @param name - The name of the user.
 * @param username - The username of the user.
 * @param email - The email address of the user.
 * @param birthDay - The birth date of the user.
 * @param phoneNum - The phone number of the user.
 * @returns The ID of the newly registered user.
 * @throws Will throw an error if the database operation fails.
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

    // Define your query with placeholders for parameters
    const query = 'INSERT INTO Users (name, username, email, birthdate, phoneNum) VALUES (?, ?, ?, ?, ?)';

    // Execute the query
    const result: ResultSetHeader = await db.exQuery(query, [name, username, email, birthDay, phoneNum]);

    await db.close(); // Close the connection
    return result.insertId; // Return the inserted user's ID
};
