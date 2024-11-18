import executeQuery from "@/database/mysqldb";

/**
 * Get the user's role by UID.
 * @param uid - User ID
 * @returns The role of the user: "Customer", "StoreMgr", or "Admin".
 */
export async function getUserRoleByUID(uid: number): Promise<string> {
    const queries = [
        { table: "Customers", role: "customer" },
        { table: "StoreMgrs", role: "manager" },
        { table: "Admins", role: "admin" },
    ];

    for (const { table, role } of queries) {
        const result = await executeQuery(`SELECT UID FROM ${table} WHERE UID = ?`,
            [uid]) as string;

        if (result.length > 0) {
            return role;
        }
    }

    // Default role if no matches
    return "ERR: NO ROLE";
}
