import executeQuery from "@/database/mysqldb";
import StoreDetails from "@/types/models/StoreDetail";
import RawStoreDetails from "@/types/models/RawStoreDetail"

export class StoreDetailRep {
    public async getStoreDetails(storeId: string): Promise<StoreDetails | undefined> {
        const query = `
            SELECT  S.store_name AS name, S.modality, 
                    S.street, 
                    S.city, 
                    S.state, 
                    S.zip AS zipCode, 
                    S.country,
                    P.image
            FROM Stores S
            LEFT JOIN storePhotos P ON P.sid = S.sid
            WHERE S.sid = ?;
        `;

        try {
            const rawResult = await executeQuery(query, [storeId]) as RawStoreDetails[];
    
            const refinedResult = rawResult.map((store) => ({
                ...store,
                image: store.image
                    ? `data:image/jpeg;base64,${store.image.toString("base64")}` // Add prefix for base64
                    : undefined, // Handle missing images
            }));
    
            return refinedResult[0];
        } catch (error) {
            console.error("Error fetching Games:", error);
            return undefined;
        }
    }
}