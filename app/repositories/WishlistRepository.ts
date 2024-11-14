import Database from '../../database/Database';
import WishlistRow from '@/types/models/WishlistRow';

export class WishlistRepository {
    public async getGameByUsername(username: string): Promise<WishlistRow[]> {
        const query = `
            SELECT W.Game_Title, B.Name
            FROM Wishlists W
            LEFT JOIN Business B
            ON W.Dev_ID = B.BID
            WHERE W.UID = (SELECT U.UID FROM Users U WHERE Username = ?);
        `;
        const result = await Database.getInstance().executeQuery(query, [username]) as WishlistRow[];
        return result;
    }
}
