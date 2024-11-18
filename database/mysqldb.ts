import mysql from "mysql2/promise";

type Query = string;
type Data = unknown[];

const createDatabaseConnection = async () => {
  const sslCA = process.env.DB_SSL_CA_BASE64
    ? Buffer.from(process.env.DB_SSL_CA_BASE64, "base64").toString("utf-8")
    : null;

  const connectionOptions: mysql.ConnectionOptions = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  };

  if (sslCA) {
    connectionOptions.ssl = { ca: sslCA };
  }

  return mysql.createConnection(connectionOptions);
};

const executeQuery = async (query: Query, data: Data) => {
  try {
    const db = await createDatabaseConnection();
    const [result] = await db.execute(query, data);
    await db.end();
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default executeQuery;
