import executeQuery from "@/database/mysqldb";

export type StoreInfo = {
    sid: number;
    storeName: string;
    address: string;
    discount: number;
};

export type GameData = {
    gid: number;
    title: string;
    price: number;
    stores: StoreInfo[];
};

export class DiscountGamesRep {
    public async getDiscountedGames(): Promise<GameData[]> {
        const query = `
            SELECT
                G.gid,
                G.title,
                G.price,
                S.sid,
                S.store_name AS storeName,
                CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
                I.discount
            FROM Games G
            JOIN Inventories I ON G.gid = I.gid
            JOIN Stores S ON I.sid = S.sid
            WHERE I.discount > 0
            ORDER BY G.gid, I.discount DESC;
        `;
        const result = await executeQuery(query, []) as any[];

        const gamesMap: { [key: number]: GameData } = {};
        result.forEach((row) => {
            if (!gamesMap[row.gid]) {
                gamesMap[row.gid] = {
                    gid: row.gid,
                    title: row.title,
                    price: row.price,
                    stores: [],
                };
            }
            gamesMap[row.gid].stores.push({
                sid: row.sid,
                storeName: row.storeName,
                address: row.address,
                discount: row.discount,
            });
        });

        return Object.values(gamesMap);
    }
}
