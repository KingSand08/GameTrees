import mysql, { QueryResult, ResultSetHeader } from "mysql2/promise";

type Query = string;
type Data = unknown[];

const executeQuery = async (query: Query, data: Data): Promise<QueryResult | Error> => {
  try {
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });
    const [result] = await (await db).execute(query, data);
    await (await db).end();
    console.log(result);
    // Ensure result is cast as ResultSetHeader for access to affectedRows
    if ('affectedRows' in result) {
      return result as ResultSetHeader;
    }
    // If the result doesn't have affectedRows, throw an error
    throw new Error("Query result does not contain affectedRows");
  } catch (error) {
    console.log(error);
    return error as Error;

  }
};

export default executeQuery;
