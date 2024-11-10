import mysql, { Pool } from "mysql2/promise";

type Query = string;
type Data = unknown[];

class Database {
  private static instance: Database;
  private pool: Pool;

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  // Static method to provide access to the singleton instance
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Method to execute a query using the connection pool
  public async executeQuery(query: Query, data: Data) {
    try {
      const [result] = await this.pool.execute(query, data);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }
}

export default Database;
