// import executeQuery from "@/database/mysqldb";
import { isUserAdmin, isUserCustomer, isUserManager } from "./checkUserRole";

/**
 * Get the user's role by UID.
 * @param uid - User ID
 * @returns The role of the user: "Customer", "StoreMgr", or "Admin".
 */
// export async function getUserRoleByUID(uid: string | number): Promise<string> {

//     const queries = [
//         { table: "Customers", role: "customer" },
//         { table: "StoreMgrs", role: "manager" },
//         { table: "Admins", role: "admin" },
//     ];

//     for (const { table, role } of queries) {
//         const result = await executeQuery(`SELECT uid FROM ${table} WHERE uid = ?`,
//             [uid]) as string;
//         // console.log(`IN QT: ${table}`)
//         // console.log(uid)
//         if (result.length > 0) {
//             return role;
//         }
//     }

//     // Default role if no matches
//     return "ERR: NO ROLE";
// }

// Using if-else statement instead of cross join 3 tables to optimize the database query 
export async function getUserRoleByUID(uid: string | number): Promise<string | null> {
    const isCustomer = await isUserCustomer(uid);
    if (isCustomer) {
        return "customer";
    }

    const isManager = await isUserManager(uid);
    if (isManager) {
        return "manager";
    }

    const isAdmin = await isUserAdmin(uid);
    if (isAdmin) {
        return "admin";
    }

    return "ERR: NO ROLE";
}