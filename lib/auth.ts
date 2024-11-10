import { Lucia } from "lucia";
import { mysqlConn } from "@/database/old/mysqlConnection"; // Adjust the import path if necessary
// import {
//     createUser,
//     getUserById,
//     createUserSession,
//     getUserSession
// } from "@/services/AuthUser"; // Import the query functions

// Get the MysqlCon instance to access the adapter
const adapter = mysqlConn.getAdapter(); // Get the Mysql2Adapter from your connection instance

// Create a new Lucia instance with the adapter and session cookie configuration
export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            username: attributes.username
        };
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
}