import executeQuery from "@/database/mysqldb";

const result = (await executeQuery("SELECT * FROM Users", [])) as any[];
let AllUsers = result;

export default AllUsers;