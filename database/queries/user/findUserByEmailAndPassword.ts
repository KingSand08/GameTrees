import executeQuery from "@/database/mysqldb";

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