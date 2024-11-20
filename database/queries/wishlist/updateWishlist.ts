import executeQuery from "@/database/mysqldb";

export class WishlistEdition {
    public async removeByGid(gid: string, username: string): Promise<void> {
        const query = `
            DELETE FROM Wishlists W
            WHERE W.gid = ? AND W.uid = (SELECT U.UID FROM Users U WHERE Username = ?);
        `;

        await executeQuery(query, [gid, username] );
    }
}
