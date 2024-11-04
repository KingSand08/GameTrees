import { MysqlCon } from "@/database/mysqlConnection";

// Create an instance of MysqlCon
const dbConnection = new MysqlCon();

// Function to fetch users from the database
export const fetchUsersFromDB = async () => {
  try {
    await dbConnection.open(); // Open the connection
    console.log("Connected to the database");

    // Query to select all users
    const rows = await dbConnection.selQuery("SELECT * FROM Users");
    console.log("Fetched data: ", rows);
    // Return the fetched data
    return rows;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching data: ", error);
    // Re-throw the error for further handling if needed
    throw error;
  } finally {
    // Ensure the connection is closed after the operation
    await dbConnection.close();
  }
}

// Call the fetch function and handle the received data
fetchUsersFromDB()
  .then(data => {
    // Handle received data here
    console.log("Received data:", data);
  })
  .catch(error => {
    // Handle the error here
    console.error("Error fetching data:", error);
  });
