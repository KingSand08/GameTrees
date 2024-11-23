import executeQuery from "@/database/mysqldb";

export async function isUserManager(uid: number): Promise<string | null> {
    const isManager = await executeQuery(`SELECT M.uid FROM Users U JOIN StoreMgrs M WHERE U.uid = M.uid`,
        [uid]) as string;

    if (isManager.length > 0) {
        return "manager";
    } else {
        return null;
    }
}

export async function isUserAdmin(uid: number): Promise<string | null> {
    const isAdmin = await executeQuery(`SELECT A.uid FROM Users U JOIN Admins A WHERE U.uid = A.uid`,
        [uid]) as string;

    if (isAdmin.length > 0) {
        return "admin";
    } else {
        return null;
    }
}