import pool from "../utils/mysql";

export const fetchDataFromDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database");

    const [rows] = await connection.query("SELECT * FROM Product");
    console.log("Fetched data: ", rows);

    connection.release(); // Release connection back to pool
    return rows;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

fetchDataFromDB().then(data => {
  // Handle received data here
  console.log("Recieved data:", data);
}).catch(error => {
  // Handle the error here
  console.error("Error fetching data:", error);
})
