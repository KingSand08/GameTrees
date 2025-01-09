// import executeQuery from "@/database/mysqldb";
import { isUserAdmin, isUserCustomer, isUserManager } from "./checkUserRole";

/**
 * Get the user's role by UID.
 * @param uid - User ID
 * @returns The role of the user: "Customer", "StoreMgr", or "Admin".
 */
export async function getUserRoleByUID(uid: string | number): Promise<string> {
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