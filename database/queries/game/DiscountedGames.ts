import executeQuery from "@/database/mysqldb";

export type GameDeal = {
  gid: number;
  title: string;
  price: number;
  discount: number;
  discountedPrice: number;
  storeName: string;
  storeId: number;
};

export class DiscountedGamesRep {
  public static async getBestGameDeals(limit?: number): Promise<GameDeal[]> {
    const query = `
      SELECT
          G.gid,
          G.title,
          G.price,
          I.discount,
          ROUND(G.price * (1 - I.discount), 2) AS discountedPrice,
          S.store_name AS storeName,
          S.sid AS storeId
      FROM Games G
      JOIN Inventories I ON G.gid = I.gid
      JOIN Stores S ON I.sid = S.sid
      JOIN (
          SELECT
              gid,
              MAX(discount) AS maxDiscount
          FROM Inventories
          GROUP BY gid
      ) AS MaxDiscounts ON G.gid = MaxDiscounts.gid AND I.discount = MaxDiscounts.maxDiscount
      WHERE G.price > 0
      ORDER BY I.discount DESC, discountedPrice ASC, G.title ASC
      ${limit ? `LIMIT ${limit}` : ""};
    `;

    const result = await executeQuery(query, []) as any[];

    return result.map((row) => ({
      gid: row.gid,
      title: row.title,
      price: row.price,
      discount: row.discount,
      discountedPrice: row.discountedPrice,
      storeName: row.storeName,
      storeId: row.storeId,
    }));
  }
}
