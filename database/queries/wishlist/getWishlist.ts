import blobToBase64 from "@/utils/blobToBase64";
import executeQuery from "@/database/mysqldb";
import WishlistRow from "@/types/models/WishlistRow";

export default interface RawWishlistRow {
    Title: string;
    Name: string;
    img?: Buffer;
    Price: number;
    gid: string;
}
export class WishlistRepository {
    public async getGameByUsername(username: string): Promise<WishlistRow[]> {
        const query = `
            SELECT 
                G.Title,
                B.Name,
                PG.img,
                G.Price,
                W.gid
            FROM 
                Wishlists W
            LEFT JOIN 
                Games G ON G.gid = W.gid
            LEFT JOIN
                GamePhotos PG ON W.gid = PG.gid
            LEFT JOIN
                Photos P ON P.pid = PG.gpid
            LEFT JOIN 
                Business B ON G.did = B.BID
            WHERE 
                W.UID = (SELECT U.UID FROM Users U WHERE Username = ?);
        `;

        const results = await executeQuery(query, [username]) as WishlistRow[];

        // Convert images to Base64
        const processedResults = results.map((result) => ({
            ...result,
            Image: result.img ? blobToBase64(result.img) : undefined,
        }));

        return processedResults;
    }
}
