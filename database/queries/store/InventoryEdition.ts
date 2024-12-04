import executeQuery from "@/database/mysqldb";
import Game from "@/types/models/Game";

export class InventoryEdition {
    public async removeByGid(gid: number): Promise<void> {
        const query = `
            DELETE FROM Inventories I
            WHERE I.gid = ? ;
            `;

        await executeQuery(query, [gid] );
    }

    public async addByGid(sid: number, gid: number): Promise<void> {
        const insertQuery = `
            INSERT INTO inventories(sid, gid) VALUES
            (?, ?);
        `;

        await executeQuery(insertQuery, [sid, gid] );        
    }

    public async isInInventory(sid: number, gid: number): Promise<boolean> {
        const query = `
            SELECT 1
            FROM Inventories
            WHERE sid = ? AND gid = ?;
        `;
        const result:any = await executeQuery(query, [sid, gid]);
        return result.length > 0;
    }    
}
