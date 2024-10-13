import mysql from "mysql2/promise";

const pool = mysql.createPool({
    database: 'TestDB',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool;