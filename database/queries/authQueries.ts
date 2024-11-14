import executeQuery from "@/database/mysqldb";
import { User } from "@/types/models/User"

// Check if a user exists in the Users table
export const findUserByEmailAndPassword = async (email: string, password: string) => {
  const query = `
    SELECT * FROM Users U 
    WHERE U.Email = ? 
    AND U.Password = ? 
    AND EXISTS (
      SELECT * FROM Customers C 
      WHERE U.UID = C.UID
    );
  `;
  const data = [email, password];
  return executeQuery(query, data);
};

// Check if a user exists based on email (for Google sign-in)
export const findUserByEmail = async (email: string): Promise<User[]> => {
  const query = `SELECT * FROM Users WHERE Email = ?;`;
  const data = [email];
  return executeQuery(query, data) as Promise<User[]>;
};
