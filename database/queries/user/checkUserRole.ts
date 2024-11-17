import executeQuery from "@/database/mysqldb";

export async function isUserManager(uid: number): Promise<string | null> {
    const isManager = await executeQuery(`SELECT M.UID FROM Users U JOIN StoreMgrs M WHERE U.UID = M.UID`,
        [uid]) as string;

    if (isManager.length > 0) {
        return "manager";
    } else {
        return null;
    }
}

export async function isUserAdmin(uid: number): Promise<string | null> {
    const isAdmin = await executeQuery(`SELECT A.UID FROM Users U JOIN Admins A WHERE U.UID = A.UID`,
        [uid]) as string;

    if (isAdmin.length > 0) {
        return "admin";
    } else {
        return null;
    }
}