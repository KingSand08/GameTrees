import executeQuery from "@/database/mysqldb";

// Check if a user exists in the Users table
export const findUserByEmailAndPassword = async (email: string, password: string) => {
  const query = `
    SELECT * FROM Users U 
    WHERE U.email = ? 
    AND U.password = ? 
  `;
  const data = [email, password];
  return executeQuery(query, data);
};