import mysql from "mysql2/promise";

type Query = string;
type Data = unknown[];

const executeQuery = async (query: Query, data: Data) => {
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
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default executeQuery;
