import blobToBase64 from "@/utils/blobToBase64";
import executeQuery from "@/database/mysqldb";
import WishlistRow from "@/types/models/WishlistRow";

export default interface RawWishlistRow {
    Title: string;
    Name: string;
    Image?: Buffer;
    Price: number;
    gid: string;
}
export class WishlistRepository {
    public async getGameByUsername(username: string): Promise<WishlistRow[]> {
        const query = `
            SELECT 
                G.Title,
                B.Name,
                P.Image,
                G.Price,
                W.gid
            FROM 
                Wishlists W
            LEFT JOIN 
                Games G ON G.gid = W.gid
            LEFT JOIN
                Game_Photos PG ON W.gid = PG.gid
            LEFT JOIN
                Photos P ON P.Photo_ID = PG.Photo_ID
            LEFT JOIN 
                Business B ON G.Dev_ID = B.BID
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
