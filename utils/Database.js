import mysql from "mysql2/promise";

class Database {
    static db;

    constructor() {
        if(Database.db) {
            return Database.db;
        }

        this.pool = mysql.createpool( {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        Database.db = this;
    }

    async fetchFromDB(query, params = []) {
        try {
            const[result] = await this.pool.execute(query. params);
            return result;
        }
        catch (error) {
            console.error("Fetching error: ", error);
            throw error;
        }
    }

    async insertToDB(query, params = []) {
        try {
            const[values] = await this.pool.execute(query, params);
            return values;
        }
        catch (error) {
            console.error("Inserting error: ", error);
            throw error;
        }
    }

}

export default new Database();
