import blobToBase64 from "@/utils/blobToBase64";
import executeQuery from "@/database/mysqldb";
import WishlistRow from "@/types/models/WishlistRow";

export default interface RawWishlistRow {
    Game_Title: string;
    Name: string;
    Image?: Buffer;
    Price: number;
}
export class WishlistRepository {
    public async getGameByUsername(username: string): Promise<WishlistRow[]> {
        const query = `
            SELECT 
                W.Game_Title,
                B.Name,
                G.Price,
                P.Image
            FROM 
                Wishlists W
            LEFT JOIN 
                Business B ON W.Dev_ID = B.BID
            LEFT JOIN 
                Games G ON W.Game_Title = G.Title AND W.Dev_ID = G.Dev_ID
            LEFT JOIN
                Game_Photos PG ON W.Game_Title = PG.Title AND W.Dev_ID = PG.Dev_ID
            LEFT JOIN
                Photos P ON P.Photo_ID = PG.Photo_ID
            WHERE 
                W.UID = (SELECT U.UID FROM Users U WHERE Username = ?);
        `;

        const results = await executeQuery(query, [username]) as RawWishlistRow[];

        // Convert images to Base64
        const processedResults = results.map((result) => ({
            ...result,
            Image: result.Image ? blobToBase64(result.Image) : undefined,
        }));

        return processedResults;
    }
}
