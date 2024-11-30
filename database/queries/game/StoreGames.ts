import executeQuery from "@/database/mysqldb";

export type StoreInfo = {
    sid: number;
    storeName: string;
    address: string;
    opsDays: string;
    opsHours: string;
    discount: number;
};

export type GameStoresData = {
    gid: number;
    title: string;
    description: string;
    price: number;
    stores: StoreInfo[];
};

export class StoreGamesRep {
    public async getGameStores(gameId: string): Promise<GameStoresData> {
        const query = `
            SELECT
                G.gid,
                G.title,
                G.description,
                G.price,
                S.sid,
                S.store_name AS storeName,
                CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
                S.ops_days AS opsDays,
                S.ops_hours AS opsHours,
                I.discount
            FROM Games G
            JOIN Inventories I ON G.gid = I.gid
            JOIN Stores S ON I.sid = S.sid
            WHERE G.gid = ?;
        `;
        const result = await executeQuery(query, [gameId]) as any[];

        if (result.length === 0) {
            throw new Error(`No data found for game ID: ${gameId}`);
        }

        const { gid, title, description, price } = result[0];
        const stores = result.map((row) => ({
            sid: row.sid,
            storeName: row.storeName,
            address: row.address,
            opsDays: row.opsDays,
            opsHours: row.opsHours,
            discount: row.discount,
        }));

        return { gid, title, description, price, stores };
    }
}
