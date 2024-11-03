import mysql, { Pool, PoolConnection, RowDataPacket } from 'mysql2/promise';


/**
 * MysqlCon is a class that manages a MySQL database connection using a connection pool.
 * It provides methods to open a connection, execute queries, and manage connection resources.
*/
export class MysqlCon {
    private pool: Pool;
    private connection: PoolConnection | null = null;

    /**
     * Constructs a MysqlCon instance and initializes the connection pool.
     * It reads database connection parameters from environment variables.
    */
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    /**
     * Opens a connection from the pool for executing queries.
     * Throws an error if the connection is already open.
    */
    async open(): Promise<void> {
        if (!this.connection) {
            this.connection = await this.pool.getConnection();
        }
    }

    /**
     * Executes a SQL query against the database.
     * @param query - The SQL query string to execute.
     * @returns An array of rows returned by the query.
     * @throws Will throw an error if the connection is not open.
    */
    async query<T extends RowDataPacket>(query: string): Promise<T[]> {
        if (!this.connection) {
            throw new Error('Connection is not open. Call open() first.');
        }

        const [rows]: [T[], mysql.FieldPacket[]] = await this.connection.query(query);
        return rows;
    }

    /**
     * Closes the current connection and resets it to null.
     * This should be called when the connection is no longer needed.
    */
    async close(): Promise<void> {
        if (this.connection) {
            await this.connection.release();
            this.connection = null;
        }
    }

    /**
     * Closes the connection pool and releases all resources.
     * This should be called when the application is done using the database.
    */
    async end(): Promise<void> {
        await this.pool.end();
    }
}
