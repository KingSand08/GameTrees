import executeQuery from "@/database/mysqldb";
import RawTrendGame from "@/types/models/RawTrendGame";
// import TrendGame from "@/types/models/TrendGame";
import blobToBase64 from "@/utils/blobToBase64";

export type StoreHours = {
    day: string;
    start_time: string;
    end_time: string;
};

export type Store = {
    id: number;
    name: string;
    address: string;
    modality: string;
    city: string;
    hours: StoreHours[];
};

export type GameDeal = {
    gid: number;
    title: string;
    price: number;
    discount: number;
    storeName: string;
    storeId: number;
};

export type TrendingGame = {
    gid: number;
    title: string;
    genre: string;
    lowestPrice: number;
    wishlistCount: number;
    image?: string | null;
};

export class HomepageQueries {
    public static async getBayAreaStores(): Promise<Store[]> {
        const bayAreaCities = [
            "San Francisco", "Mountain View", "Palo Alto", "Berkeley",
            "San Jose", "Oakland", "Fremont", "Burlingame",
            "Redwood City", "Santa Clara"
        ];
        const query = `
            SELECT 
                S.sid AS id,
                S.store_name AS name,
                CONCAT_WS(', ', S.street, S.city, S.state, S.zip, S.country) AS address,
                S.modality,
                S.city,
                SH.day,
                SH.start_time AS start_time,
                SH.end_time AS end_time
            FROM Stores S
            LEFT JOIN StoreHours SH ON S.sid = SH.sid
            WHERE S.city IN (${bayAreaCities.map(() => '?').join(', ')})
            ORDER BY S.sid, FIELD(SH.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
        `;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await executeQuery(query, bayAreaCities) as any[];

        return result.reduce((stores: Store[], row) => {
            const existingStore = stores.find(store => store.id === row.id);
            const hours: StoreHours = {
                day: row.day,
                start_time: row.start_time,
                end_time: row.end_time
            };

            if (existingStore) {
                existingStore.hours.push(hours);
            } else {
                stores.push({
                    id: row.id,
                    name: row.name,
                    address: row.address,
                    modality: row.modality,
                    city: row.city,
                    hours: row.day ? [hours] : []
                });
            }

            return stores;
        }, []);
    }

    public static async getTrendingGames() {
        const query = `
            SELECT
                G.gid,
                G.title,
                GROUP_CONCAT(DISTINCT GL.type) AS genre,
                MIN(CAST(G.price * (1 - I.discount) AS DECIMAL(5,2))) AS lowestPrice,
                COUNT(DISTINCT W.uid) AS wishlistCount,
                MAX(P.image)
            FROM Games G
            LEFT JOIN Wishlists W ON G.gid = W.gid
            LEFT JOIN Genres GE ON G.gid = GE.gid
            LEFT JOIN GenreList GL ON GE.genre_id = GL.genre_id
            LEFT JOIN Inventories I ON G.gid = I.gid
            LEFT JOIN GamePhotos P ON P.gid = G.gid
            GROUP BY G.gid, G.title
            ORDER BY wishlistCount DESC
            LIMIT 10;
        `;

        const results = (await executeQuery(query, [])) as RawTrendGame[];
        // console.log("actual result: ", results.length)

        const processedResults: TrendingGame[] = results.map((result) => ({
            ...result,
            image: result.image ? blobToBase64(result.image) : null,
        }));

        return processedResults;
    }

    public static async getBestGameDeals(): Promise<GameDeal[]> {
        const query = `
            SELECT 
                G.gid,
                G.title,
                G.price,
                I.discount,
                S.store_name AS storeName,
                S.sid AS storeId
            FROM Games G
            JOIN Inventories I ON G.gid = I.gid
            JOIN Stores S ON I.sid = S.sid
            WHERE I.discount > 0
            ORDER BY I.discount DESC, G.price ASC
            LIMIT 5
        `;
        const result = await executeQuery(query, []) as GameDeal[];
        return result;
    }
}
