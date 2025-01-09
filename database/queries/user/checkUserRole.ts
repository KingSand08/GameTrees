import executeQuery from "@/database/mysqldb";

export async function isUserManager(uid: string | number): Promise<boolean> {
    const isManager = await executeQuery(`
            SELECT M.uid 
            FROM StoreMgrs M 
            WHERE ? = M.uid
            LIMIT 1;
            `,
        [uid]) as string;

    return isManager.length > 0;
}

export async function isUserAdmin(uid: string | number): Promise<boolean> {
    const isAdmin = await executeQuery(`
        SELECT A.uid 
        FROM Admins A 
        WHERE ? = A.uid
        LIMIT 1;
        `,
        [uid]) as string;

    return isAdmin.length > 0;
}

export async function isUserCustomer(uid: string | number): Promise<boolean> {
    const isCustomer = await executeQuery(`
        SELECT C.uid 
        FROM Customers C 
        WHERE ? = C.uid
        LIMIT 1;
        `,
        [uid]) as string;

    return isCustomer.length > 0;
}