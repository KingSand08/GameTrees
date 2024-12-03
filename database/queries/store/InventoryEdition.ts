import executeQuery from "@/database/mysqldb";

export class InventoryEdition {
    public async removeByGid(gid: string): Promise<void> {
        const query = `
            DELETE FROM Inventories I
            WHERE I.gid = ? ;
            `;

        await executeQuery(query, [gid] );
    }

    public async addByGid(sid: string, gid: string): Promise<void> {
        const insertQuery = `
            INSERT INTO inventories(sid, gid) VALUES
            (?, ?);
        `;

        await executeQuery(insertQuery, [sid, gid] );        
    }
}
